// PDF generation helper based on Puppeteer (headless Chromium).
//
// Replaces the deprecated and unmaintained "html-pdf" / "phantomjs-prebuilt"
// stack, which no longer builds/runs on modern Node.js versions. Puppeteer is a
// widely used, actively maintained library for rendering HTML to PDF.
//
// A single browser instance is launched lazily and reused across requests for
// performance. In a container the browser must run with --no-sandbox.

var puppeteer = require('puppeteer');

var browserPromise = null;

function getBrowser() {
    if (!browserPromise) {
        browserPromise = puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });
        // If the launch fails, allow a later retry instead of caching the error.
        browserPromise.catch(function() {
            browserPromise = null;
        });
    }
    return browserPromise;
}

// Inject a <base href> so that relative resources (css/, images/) referenced in
// the templates resolve correctly, mirroring the old html-pdf "base" option.
function withBase(html, baseHref) {
    if (!baseHref || /<base\s/i.test(html)) {
        return html;
    }
    var baseTag = '<base href="' + baseHref + '">';
    if (/<head[^>]*>/i.test(html)) {
        return html.replace(/<head([^>]*)>/i, '<head$1>' + baseTag);
    }
    return baseTag + html;
}

// Render the given HTML string to a PDF file on disk.
// options: { format, margin: { top, left, right, bottom }, baseHref }
function renderToFile(html, outputPath, options) {
    options = options || {};
    return getBrowser().then(function(browser) {
        return browser.newPage().then(function(page) {
            return page
                .setContent(withBase(html, options.baseHref), {
                    waitUntil: 'networkidle0'
                })
                .then(function() {
                    return page.pdf({
                        path: outputPath,
                        format: options.format || 'A4',
                        margin: options.margin || {},
                        printBackground: true
                    });
                })
                .then(
                    function() {
                        return page.close();
                    },
                    function(err) {
                        return page.close().then(function() {
                            throw err;
                        });
                    }
                );
        });
    });
}

module.exports = {
    getBrowser: getBrowser,
    renderToFile: renderToFile
};
