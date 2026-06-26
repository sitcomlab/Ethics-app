// PDF generation helper based on Puppeteer (headless Chromium).
//
// Replaces the deprecated and unmaintained "html-pdf" / "phantomjs-prebuilt"
// stack, which no longer builds/runs on modern Node.js versions. Puppeteer is a
// widely used, actively maintained library for rendering HTML to PDF.
//
// A single browser instance is launched lazily and reused across requests for
// performance. In a container the browser must run with --no-sandbox.

var fs = require('fs');
var path = require('path');
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

function mimeTypeForImage(filePath) {
    switch (path.extname(filePath).slice(1).toLowerCase()) {
        case 'svg':
            return 'image/svg+xml';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        case 'webp':
            return 'image/webp';
        default:
            return 'application/octet-stream';
    }
}

function resolveImagePath(baseDir, src) {
    var candidates = [];
    var parts = src.split('/');
    var fileName = parts.pop();

    function add(name) {
        if (!name) {
            return;
        }
        var candidate = path.resolve(baseDir, parts.concat(name).join('/'));
        if (candidate.startsWith(baseDir + path.sep) && candidates.indexOf(candidate) === -1) {
            candidates.push(candidate);
        }
    }

    add(fileName);
    add(fileName.normalize('NFC'));
    add(fileName.normalize('NFD'));
    add(fileName
        .normalize('NFC')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/Ä/g, 'Ae')
        .replace(/Ö/g, 'Oe')
        .replace(/Ü/g, 'Ue')
        .replace(/ß/g, 'ss'));

    for (var i = 0; i < candidates.length; i++) {
        if (fs.existsSync(candidates[i])) {
            return candidates[i];
        }
    }

    return null;
}

// Chromium blocks file:// images when HTML is injected via setContent()
// (page URL stays about:blank). Inline relative image paths as data URIs.
function inlineLocalImages(html, baseHref) {
    if (!baseHref || !/^file:\/\//i.test(baseHref)) {
        return html;
    }

    var baseDir = path.resolve(baseHref.replace(/^file:\/\//i, '').replace(/\/$/, ''));

    return html.replace(/<img([^>]*?)\ssrc=["']([^"']+)["']([^>]*)>/gi, function(match, before, src, after) {
        if (/^(?:data:|https?:|file:)/i.test(src)) {
            return match;
        }

        var filePath = resolveImagePath(baseDir, src);
        if (!filePath) {
            return match;
        }

        var dataUri = 'data:' + mimeTypeForImage(filePath) + ';base64,' +
            fs.readFileSync(filePath).toString('base64');
        return '<img' + before + ' src="' + dataUri + '"' + after + '>';
    });
}

function prepareHtml(html, baseHref) {
    return inlineLocalImages(withBase(html, baseHref), baseHref);
}

// Render the given HTML string to a PDF file on disk.
// options: { format, margin: { top, left, right, bottom }, baseHref }
function renderToFile(html, outputPath, options) {
    options = options || {};
    return getBrowser().then(function(browser) {
        return browser.newPage().then(function(page) {
            return page
                .setContent(prepareHtml(html, options.baseHref), {
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
