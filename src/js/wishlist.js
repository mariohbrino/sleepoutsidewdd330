// src/js/wishlist.js
import { getLocalStorage, setLocalStorage } from './utils.mjs';

const WISHLIST_KEY = 'so-wishlist'; // Key name for localStorage

/**
 * Retrieves the current list of items from the wishlist.
 * @returns {Array} List of wishlist items.
 */
export function getWishlist() {
  return getLocalStorage(WISHLIST_KEY) || [];
}

/**
 * Adds a unique product to the wishlist.
 * @param {Object} product - The product object to add.
 */
export function addToWishlist(product) {
  const list = getWishlist();
  
  // Prevent duplicate items
  const exists = list.some(item => item.id === product.id);
  if (!exists) {
    list.push(product);
    setLocalStorage(WISHLIST_KEY, list);
  }
}