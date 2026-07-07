// src/js/utils.js

// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Wrapper to return an array of all matching elements
export function qsAll(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

// Retrieve data safely from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    return null;
  }
}

// Save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Set a listener for both touchend and click
export function setClick(elementOrSelector, callback) {
  const element = typeof elementOrSelector === "string" ? qs(elementOrSelector) : elementOrSelector;
  if (!element) return;

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// --- Wishlist Helpers ---
const WISHLIST_KEY = 'so-wishlist';

export function getWishlist() {
  return getLocalStorage(WISHLIST_KEY) || [];
}

export function addToWishlist(product) {
  const list = getWishlist();
  const exists = list.some(item => item.id === product.id);
  
  if (!exists) {
    list.push(product);
    setLocalStorage(WISHLIST_KEY, list);
    return true; // Item was successfully added
  }
  return false; // Item already existed
}