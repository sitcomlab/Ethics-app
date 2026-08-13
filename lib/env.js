// Small helpers for reading configuration from environment variables.

// Parse a boolean-ish environment variable defensively.
//
// The app used to call JSON.parse(process.env.X) directly, which throws a
// SyntaxError (and crashes the process at startup) whenever the variable is
// missing or not strict JSON (e.g. "True", "1", "yes" or an empty value).
// parseBool tolerates all of these and falls back to the provided default.
function parseBool(value, defaultValue) {
    var fallback = defaultValue === undefined ? false : defaultValue;
    if (value === undefined || value === null) {
        return fallback;
    }
    if (typeof value === 'boolean') {
        return value;
    }
    var normalized = String(value).trim().toLowerCase();
    if (normalized === '') {
        return fallback;
    }
    if (normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on') {
        return true;
    }
    if (normalized === 'false' || normalized === '0' || normalized === 'no' || normalized === 'off') {
        return false;
    }
    try {
        return Boolean(JSON.parse(normalized));
    } catch (e) {
        return fallback;
    }
}

// Public origin used in email links (scheme + host). The port is only appended
// when it is not the scheme default (80 for http, 443 for https), so production
// links stay https://giv-ethics-app.uni-muenster.de/... rather than ...:443/...
function publicOrigin() {
    var url = String(process.env.SERVER_URL || '').replace(/\/+$/, '');
    var port = String(process.env.SERVER_PORT || '').trim();
    if (!url || !port) {
        return url;
    }
    var hostPart = url.replace(/^https?:\/\//, '');
    if (/:[0-9]+$/.test(hostPart)) {
        return url;
    }
    var isHttps = url.indexOf('https://') === 0;
    var isHttp = url.indexOf('http://') === 0;
    if ((isHttps && port === '443') || (isHttp && port === '80')) {
        return url;
    }
    return url + ':' + port;
}

module.exports = {
    parseBool: parseBool,
    publicOrigin: publicOrigin
};
