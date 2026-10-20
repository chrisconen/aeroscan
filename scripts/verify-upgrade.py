"""Verify service discovery and enquiry handoff. Never submits a real enquiry."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('AEROSCAN_TEST_BASE', 'http://127.0.0.1:4321')
OUT = Path('artifacts/upgrade')
OUT.mkdir(parents=True, exist_ok=True)
report = {'base': BASE, 'checks': [], 'errors': []}
ids = ['epulet', 'mentes', 'kisallat', 'buvar', 'femdetektor', 'jaror', 'foto']

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    context.add_init_script("localStorage.setItem('cookie-consent','rejected')")
    page = context.new_page()
    page.on('pageerror', lambda error: report['errors'].append(str(error)))
    for width in [1440, 1024, 768, 390, 320]:
        page.set_viewport_size({'width': width, 'height': 950})
        for route in ['/', '/femdetektoros-kereses', '/dronos-foto-video']:
            response = page.goto(BASE + route, wait_until='networkidle')
            assert response.status == 200, (route, response.status)
            assert page.locator('h1').count() == 1
            assert not page.evaluate('document.documentElement.scrollWidth > innerWidth + 1'), (route, width, 'overflow')
            # Force lazy media into view before checking actual resource decoding.
            for image in page.locator('main img').all():
                image.scroll_into_view_if_needed()
                image.evaluate("(i) => i.decode().catch(() => {})")
                assert image.evaluate('(i) => i.naturalWidth > 0'), image.get_attribute('src')
            if width in [1440, 390]:
                page.evaluate("window.scrollTo({top:0,behavior:'instant'})")
                page.screenshot(path=str(OUT / (('home' if route == '/' else route[1:]) + f'-{width}.png')), full_page=True)
                if route == '/':
                    page.screenshot(path=str(OUT / f'hero-{width}.png'))
            report['checks'].append(f'{route} {width}px: status, H1, no overflow, decoded images')
    page.set_viewport_size({'width': 1440, 'height': 1000})
    page.goto(BASE, wait_until='networkidle')
    assert page.locator('.up-service-card').count() == 7
    assert page.locator('.up-service-strip a').count() == 7
    for service in ids:
        page.locator('#task-choice').select_option(service)
        assert page.locator('#finder-links').is_visible()
        href = page.locator('#finder-enquiry').get_attribute('href')
        assert f'szolgaltatas={service}' in href
        if service == 'mentes':
            assert '112' in page.locator('#finder-result').inner_text()
        detail = page.locator('#finder-detail').get_attribute('href')
        assert detail.startswith('/') and detail != '/kapcsolat'
    page.locator('#task-choice').select_option('')
    assert not page.locator('#finder-links').is_visible()
    report['checks'].append('All seven task choices, reset, emergency text and destination links')
    for service in ids:
        page.goto(BASE + f'/kapcsolat?szolgaltatas={service}#contact-form', wait_until='domcontentloaded')
        assert page.locator('#service').input_value() == service
        assert page.locator('link[rel="canonical"]').get_attribute('href') == 'https://aeroscan.hu/kapcsolat'
    page.goto(BASE + '/kapcsolat?szolgaltatas=unknown', wait_until='domcontentloaded')
    assert page.locator('#service').input_value() == ''
    report['checks'].append('All service enquiry handoffs; unknown parameter rejected; query-free canonical')
    page.goto(BASE + '/femdetektoros-kereses', wait_until='networkidle')
    for group, count in [('Magánszemélyek', 4), ('Vállalkozások', 5), ('Vízpart & víz', 3), ('Összes', 12)]:
        button = page.get_by_role('button', name=group, exact=True)
        button.click()
        assert button.get_attribute('aria-pressed') == 'true'
        assert page.locator('[data-case-group]:visible').count() == count
        assert str(count) in page.locator('#case-count').inner_text()
    page.locator('.up-faqs summary').first.focus()
    page.keyboard.press('Enter')
    assert page.locator('.up-faqs details').first.get_attribute('open') is not None
    report['checks'].append('All detector category filters and keyboard FAQ disclosure')
    page.emulate_media(reduced_motion='reduce')
    page.goto(BASE, wait_until='networkidle')
    assert page.locator('#hero-film').evaluate('(v) => v.paused && !v.getAttribute("src")')
    assert page.locator('.up-service-card').first.evaluate('(e) => getComputedStyle(e).transitionDuration') == '0s'
    page.locator('#film-toggle').click()
    page.wait_for_function('document.querySelector("#hero-film").currentTime > 0')
    page.locator('#film-toggle').click()
    assert page.locator('#hero-film').evaluate('(v) => v.paused')
    page.locator('#film-toggle').click()
    page.locator('#rolunk').scroll_into_view_if_needed()
    page.wait_for_function('document.querySelector("#hero-film").paused')
    report['checks'].append('Reduced motion respected; explicit video play/pause and offscreen pause')
    page.set_viewport_size({'width': 390, 'height': 844})
    page.goto(BASE, wait_until='networkidle')
    page.locator('#mobile-menu-btn').click()
    page.locator('#mobile-menu summary').filter(has_text='Szolgáltatások').click()
    assert page.locator('#mobile-menu a[href="/femdetektoros-kereses"]').is_visible()
    page.keyboard.press('Escape')
    assert not page.locator('#mobile-menu').is_visible()
    assert page.locator('#mobile-menu-btn').evaluate('(e) => e === document.activeElement')
    report['checks'].append('Mobile services menu includes new page and restores focus on Escape')
    # Structured data must remain valid JSON and expose the same full catalog.
    for item in page.locator('script[type="application/ld+json"]').all():
        data = json.loads(item.inner_text())
        if data.get('@type') == 'LocalBusiness':
            assert len(data['hasOfferCatalog']['itemListElement']) == 7
    report['checks'].append('Structured data parses and lists all seven offers')
    plain = browser.new_context(java_script_enabled=False, viewport={'width': 390, 'height': 844})
    nojs = plain.new_page()
    nojs.goto(BASE)
    assert nojs.locator('.up-service-card:visible').count() == 7
    nojs.goto(BASE + '/femdetektoros-kereses')
    assert nojs.locator('[data-case-group]:visible').count() == 12
    assert not nojs.locator('.up-filter').is_visible()
    nojs.locator('.up-faqs summary').first.click()
    assert nojs.locator('.up-faqs details').first.get_attribute('open') is not None
    report['checks'].append('No JavaScript: all services/use cases and native FAQs remain usable')
    browser.close()

(OUT / 'verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
assert not report['errors'], report['errors']
print(json.dumps(report, ensure_ascii=False, indent=2))
