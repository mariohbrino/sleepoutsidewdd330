import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const WISHLIST_KEY = "so-wishlist";

/**
 * Retrieves the current list of items from the wishlist.
 * @returns {Array} List of wishlist items.
 */
export function getWishlist() {
  return getLocalStorage(WISHLIST_KEY) || [];
}

/**
 * Adds a unique product to the wishlist using established utility functions.
 * @param {Object} product - The product object to add.
 */
export function addToWishlist(product) {
  let wishlist = getWishlist();

  // Prevent adding duplicates
  if (!wishlist.find((item) => item.id === product.id)) {
    wishlist.push(product);
    setLocalStorage(WISHLIST_KEY, wishlist);
  }
}
