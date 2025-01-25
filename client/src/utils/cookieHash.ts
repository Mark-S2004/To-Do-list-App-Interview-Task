import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

// Access the secret key from environment variables
const SECRET_KEY = import.meta.env.VITE_APP_COOKIE_SECRET_KEY as string;

/**
 * Encrypts data using AES-256 and stores it in a cookie.
 * @param {string} name - The name of the cookie.
 * @param {any} value - The value to store in the cookie (can be any type).
 * @param {number} expires - Time in days until the cookie expires.
 */
export const cookieStore = (name: string, value: any, expires: number = 1) => {
  // Encrypt the value using AES-256
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();

  // Store the encrypted value in the cookie with expiration
  Cookies.set(name, encryptedValue, { expires });
};

/**
 * Retrieves and decrypts AES-256 encrypted data from a cookie.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {any | null} - The decrypted value, or null if decryption fails.
 */
export const cookieGet = (name: string): any | null => {
  // Get the encrypted value from the cookie
  const encryptedValue = Cookies.get(name);

  if (encryptedValue) {
    try {
      // Decrypt the cookie value using AES-256
      const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

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