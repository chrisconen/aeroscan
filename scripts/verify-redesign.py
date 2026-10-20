"""Browser smoke checks for the AeroScan redesign. Never submits a real form."""
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

EXPERIENCES = '--experiences' in sys.argv
OUT = Path('artifacts/experiences' if EXPERIENCES else 'artifacts/redesign')
OUT.mkdir(parents=True, exist_ok=True)
BASE = 'http://127.0.0.1:4321'
routes = ['/', '/epuletfelmeres', '/kereses-mentes', '/kereses-buvarral', '/elveszett-kisallat-kereses-dronnal', '/jaror-szolgalat', '/kapcsolat', '/referenciak', '/blog', '/impresszum', '/adatvedelmi-nyilatkozat', '/gyor', '/sopron', '/tatabanya', '/budapest', '/dunaujvaros', '/szeged', '/pecs', '/debrecen']
routes += ['/blog/' + p.stem for p in Path('src/content/blog').glob('*.md')]
routes += ['/femdetektoros-kereses', '/dronos-foto-video']
if EXPERIENCES:
    routes = ['/elveszett-kisallat-kereses-dronnal', '/kereses-mentes', '/epuletfelmeres', '/jaror-szolgalat']
report = {'pages': [], 'errors': [], 'interactions': []}
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, device_scale_factor=1)
    context.add_init_script("localStorage.setItem('cookie-consent', 'rejected')")
    page = context.new_page()
    page.on('pageerror', lambda error: report['errors'].append(str(error)))
    for width in ([1440, 768, 390] if EXPERIENCES else [1440, 390]):
        page.set_viewport_size({'width': width, 'height': 950})
        for route in routes:
            response = page.goto(BASE + route, wait_until='networkidle')
            page.locator('main').wait_for()
            result = page.evaluate('''() => ({
              h1: document.querySelectorAll('h1').length,
              overflow: document.documentElement.scrollWidth > innerWidth + 1,
              brokenImages: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
              missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => a.hash.length > 1 && !document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a => a.hash)
            })''')
            result.update(route=route, width=width, status=response.status)
            report['pages'].append(result)
            if EXPERIENCES:
                page.locator('.story-hero').screenshot(path=str(OUT / (route.strip('/') + '-hero-' + str(width) + '.png')))
                # Reveal scrolling content before capturing; no screenshots of hidden animation states.
                for section in page.locator('.experience [data-reveal]').all():
                    section.scroll_into_view_if_needed()
                    page.wait_for_timeout(800)
                page.evaluate('document.activeElement?.blur()')
                page.locator('.experience').screenshot(path=str(OUT / (route.strip('/') + '-' + str(width) + '.png')))
                for explorer in page.locator('[data-explorer]').all():
                    tabs = explorer.locator('[data-scene-tab]')
                    for index in range(max(1, tabs.count())):
                        if tabs.count():
                            tabs.nth(index).click()
                        panel = explorer.locator('[data-scene-panel]:visible')
                        for button in panel.locator('[data-hotspot]').all():
                            before = button.bounding_box()
                            button.click()
                            tip = panel.locator('[data-tooltip]:visible')
                            assert tip.count() == 1
                            assert button.get_attribute('aria-expanded') == 'true'
                            box = tip.bounding_box()
                            assert box['x'] >= -1 and box['x'] + box['width'] <= width + 1
                            after = button.bounding_box()
                            assert abs(before['x'] - after['x']) < 4
                            page.keyboard.press('Escape')
                            assert panel.locator('[data-tooltip]:visible').count() == 0
                        panel.locator('[data-point-link]').last.click()
                        assert panel.locator('[data-tooltip]:visible').count() == 1
                        panel.locator('[data-close-tip]:visible').click()
                        panel.locator('[data-open-image]').click()
                        assert panel.locator('dialog').is_visible()
                        page.keyboard.press('Escape')
                        assert not panel.locator('dialog').is_visible()
                    if tabs.count() > 1:
                        tabs.first.click()
                        tabs.first.focus()
                        page.keyboard.press('ArrowRight')
                        assert tabs.nth(1).get_attribute('aria-selected') == 'true'
                        tabs.first.click()
                    panel = explorer.locator('[data-scene-panel]:visible')
                    panel.locator('[data-hotspot]').first.click()
                    explorer.screenshot(path=str(OUT / (route.strip('/') + '-interactive-' + str(width) + '.png')))
                    page.keyboard.press('Escape')
                for disclosure in page.locator('.animal-card details').all():
                    disclosure.locator('summary').click()
                    assert disclosure.get_attribute('open') is not None
                assert not page.evaluate('document.documentElement.scrollWidth > innerWidth + 1')
                report['interactions'].append(f'{route} at {width}px: all hotspots, tabs, image dialogs and animal disclosures passed')
            elif route in ['/', '/epuletfelmeres', '/kapcsolat', '/kereses-buvarral', '/blog']:
                page.screenshot(path=str(OUT / (('home' if route == '/' else route.strip('/')) + '-' + str(width) + '.png')), full_page=True)
        if width == 390:
            page.goto(BASE, wait_until='networkidle')
            page.locator('#mobile-menu-btn').click()
            assert page.locator('#mobile-menu').is_visible()
            page.keyboard.press('Escape')
            assert not page.locator('#mobile-menu').is_visible()
            page.locator('#mobile-menu-btn').click()
            page.locator('#mobile-menu a[href="/#rolunk"]').click()
            assert not page.locator('#mobile-menu').is_visible()
            report['interactions'].append('Mobile menu opens, closes with Escape, and closes after anchor navigation')
    if EXPERIENCES:
        page.emulate_media(reduced_motion='reduce')
        page.goto(BASE + '/epuletfelmeres', wait_until='networkidle')
        assert page.locator('.hotspot-button').first.evaluate("e => getComputedStyle(e, '::before').animationName") == 'none'
        page.emulate_media(reduced_motion='no-preference')
        report['interactions'].append('Reduced-motion preference disables hotspot pulses')
    page.set_viewport_size({'width': 1024, 'height': 1536})
    page.goto(BASE, wait_until='networkidle')
    page.screenshot(path=str(OUT / 'home-1024.png'), full_page=True)
    page.set_viewport_size({'width': 1440, 'height': 1000})
    page.goto(BASE + '/kapcsolat', wait_until='networkidle')
    page.locator('#email').fill('first@example.com')
    page.locator('#email_confirm').fill('different@example.com')
    page.evaluate("document.querySelector('#contact-form').dispatchEvent(new Event('submit', {cancelable:true}))")
    assert page.locator('#email_confirm').evaluate('(e) => e.validationMessage') == 'Az email címek nem egyeznek!'
    page.locator('#email_confirm').fill('first@example.com')
    assert page.locator('#email_confirm').evaluate('(e) => e.validationMessage') == ''
    report['interactions'].append('Contact form email confirmation validated locally; no message sent')
    fresh = browser.new_context(viewport={'width': 390, 'height': 844})
    cookie = fresh.new_page()
    cookie.goto(BASE, wait_until='networkidle')
    assert cookie.locator('#cookie-banner').is_visible()
    cookie.locator('#cookie-reject').click()
    cookie.reload(wait_until='networkidle')
    assert not cookie.locator('#cookie-banner').is_visible()
    report['interactions'].append('Cookie dismissal persists after reload')
    browser.close()
report['failures'] = [r for r in report['pages'] if r['status'] != 200 or r['h1'] != 1 or r['overflow'] or r['brokenImages'] or r['missingAnchors']]
(OUT / 'verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'checked':len(report['pages']), 'failures':report['failures'], 'errors':report['errors'], 'interactions':report['interactions']}, ensure_ascii=False))
