import Cookies from 'js-cookie';
import crypto from 'crypto';

// Access the secret key from environment variables
const SECRET_KEY = import.meta.env.VITE_APP_COOKIE_SECRET_KEY as string;

/**
 * Encrypts data using AES-256 and stores it in a cookie.
 * @param {string} name - The name of the cookie.
 * @param {any} value - The value to store in the cookie (can be any type).
 * @param {number} expires - Time in days until the cookie expires.
 */
export const cookieStore = (name: string, value: any, expires: number = 1) => {
    const key = crypto.createHash('sha256').update(String(SECRET_KEY)).digest('base64').substr(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  
    let encryptedValue = cipher.update(JSON.stringify(value), 'utf8', 'hex');
    encryptedValue += cipher.final('hex');
    const encryptedData = iv.toString('hex') + encryptedValue;
  
    // Store the encrypted value in the cookie with expiration
    Cookies.set(name, encryptedData, { expires });
};

/**
 * Retrieves and decrypts AES-256 encrypted data from a cookie.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {any | null} - The decrypted value, or null if decryption fails.
 */
export const cookieGet = (name: string): any | null => {
    const encryptedData = Cookies.get(name);

    if (encryptedData) {
      try {
        const key = crypto.createHash('sha256').update(String(SECRET_KEY)).digest('base64').substr(0, 32);
        const iv = Buffer.from(encryptedData.substring(0, 32), 'hex');
        const encryptedText = encryptedData.substring(32);
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  
        let decryptedValue = decipher.update(encryptedText, 'hex', 'utf8');
        decryptedValue += decipher.final('utf8');
  
        // Parse and return the original value
        return JSON.parse(decryptedValue);
      } catch (error) {
        console.error('Error decrypting cookie:', error);
        return null;
      }
    }
  
    return null; // Return null if the cookie doesn't exist or decryption fails
};

/**
 * Removes the cookie by name.
 * @param {string} name - The name of the cookie to remove.
 */
export const cookieRemove = (name: string) => {
  Cookies.remove(name);
};

/**
 * Clears all cookies.
 */
export const clearAllCookies = () => {
  // Retrieve all cookie names
  const allCookies = Cookies.get();

  // Iterate through all cookies and remove them
  for (const cookieName in allCookies) {
    if (Object.prototype.hasOwnProperty.call(allCookies, cookieName)) {
      Cookies.remove(cookieName);
    }
  }
};