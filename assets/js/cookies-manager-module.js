
class CookieManager {
    /**
     * Set a cookie with the given name, value, and optional options.
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value to be stored in the cookie. Can be a serialized Json object
     * @param {object} options - Optional cookie options (e.g., expiration, path, domain, secure).
     */
    static setCookie(name, value, options = {}) {
        let cookieString = `${name}=${encodeURIComponent(value)}`;

        if (options.expires) {
            const expires = new Date(options.expires);
            cookieString += `; expires=${expires.toUTCString()}`;
        }

        if (options.path) {
            cookieString += `; path=${options.path}`;
        }

        if (options.domain) {
            cookieString += `; domain=${options.domain}`;
        }

        if (options.secure) {
            cookieString += '; secure';
        }

        document.cookie = cookieString;
        
    }

    /**
     * Get the value of a cookie by name.
     * @param {string} name - The name of the cookie to retrieve.
     * @returns {string|null} - The cookie's value or null if not found.
     */
    static getCookieValue(name) {
        const cookies = CookieManager.getAllCookiesAsDict();
        if (name in cookies) {
            return decodeURIComponent(cookies[name]);
        }
        return undefined;
    }

    static getAllCookiesAsDict() {
        return document.cookie.split(';').reduce((cookies, cookie) => {
            const [key, value] = cookie.trim().split('=');
            cookies[key] = value;
            return cookies;
        }, {});
    }

    /**
     * Delete a cookie by name.
     * @param {string} name - The name of the cookie to delete.
     */
    static deleteCookie() {        
        document.cookie = "" 
    }
}

/* 
// Example usage:
// Set a cookie
CookieManager.setCookie('username', 'john_doe', { expires: '2023-12-31', path: '/' });

// Get a cookie's value
const username = CookieManager.getCookie('username');
console.log(username); // 'john_doe'

// Delete a cookie
CookieManager.deleteCookie('username');
 */

export default CookieManager