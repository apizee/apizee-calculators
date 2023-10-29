
import CookieManager from './cookies-manager-module'



describe('CookieManager', () => {
    
     // Mock document.cookie
     let originalDocumentCookie = {};

     beforeAll(() => {
         originalDocumentCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
     });

     beforeEach(() => {
         Object.defineProperty(document, 'cookie', {
             writable: true,
             value: '', // Initialize the cookie as an empty string
         });
     });

    it('should set a cookie', () => {
        CookieManager.setCookie('username', 'john_doe', { expires: '2023-12-31', path: '/' });
        //console.log("cookie#######:" + document.cookie)

        expect(document.cookie).toContain('username=john_doe');
    });

    it('should get a cookie value', () => {
        // Set a test cookie
        document.cookie = 'testCookie=testValue';

        const value = CookieManager.getCookieValue('testCookie');
        expect(value).toBe('testValue');
    });

    it('should return null for a non-existent cookie', () => {
        const value = CookieManager.getCookieValue('nonExistentCookie');
        expect(value).not.toBeDefined();
    });

    it('should delete a cookie', () => {
        // Set a test cookie
        document.cookie = 'cookieToDelete=valueToBeDeleted';

        CookieManager.deleteCookie('cookieToDelete');

        // Check if the cookie has been deleted (should have an expired date)
        const cookieParts = document.cookie.split(';');
        for (const cookiePart of cookieParts) {
            expect(cookiePart.trim()).not.toStartWith('cookieToDelete');
        }
    });

    it('should set a cookie with default options', () => {
        CookieManager.setCookie('username', 'john_doe', {path: "/"});
        expect(document.cookie).toContain('username=john_doe');
        // Check if the cookie has default options (path=/)
        expect(document.cookie).toContain('path=/');
    });
    
    it('should set a cookie with custom options', () => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Expires in 7 days
    
        CookieManager.setCookie('role', 'user', { expires: expirationDate, path: '/app' });
        expect(document.cookie).toContain('role=user');
        expect(document.cookie).toContain(`expires=${expirationDate.toUTCString()}`);
        expect(document.cookie).toContain('path=/app');
    });
    
    it('should overwrite an existing cookie with the same name', () => {
        // Set an existing cookie
        document.cookie = 'username=old_value';
    
        CookieManager.setCookie('username', 'new_value');
        const cookieValue = CookieManager.getCookieValue('username');
    
        expect(cookieValue).toBe('new_value');
    });
    
    it('should handle special characters in cookie values', () => {
        const specialChars = ' !@#$%^&*()_+{}[]|:;"<>,.?/~';
        CookieManager.setCookie('specialCookie', specialChars);
        const cookieValue = CookieManager.getCookieValue('specialCookie');
        expect(cookieValue).toBe(specialChars);
    });
    
    it('should delete a non-existent cookie without errors', () => {
        // Attempt to delete a cookie that does not exist
        CookieManager.deleteCookie('nonExistentCookie');
        // No errors should be thrown
        expect(document.cookie).toBe('');
    });
    
    it('should handle cookie names and values with spaces', () => {
        CookieManager.setCookie('my cookie', 'my value');
        const cookieValue = CookieManager.getCookieValue('my cookie');
        expect(cookieValue).toBe('my value');
    });
    
});
