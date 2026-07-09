// src/js/wishlistPage.js
import { getWishlist, qs } from './utils.mjs';

// 1. Template function to generate the HTML markup for a single product card
function wishlistTemplate(item) {
  return `
    <li class="product-card">
      <img src="${item.image}" alt="${item.name}" />
      <h2 class="card__name">${item.name}</h2>
      <p class="product-card__price">$${item.price}</p>
    </li>
  `;
}

// 2. Main function to render all items on the page
function renderWishlist() {
  const wishlistItems = getWishlist();
  const container = qs('#wishlist-container');

  // If the wishlist is empty, show a friendly message
  if (wishlistItems.length === 0) {
    container.innerHTML = `<p>Your wishlist is currently empty. Go add some tents!</p>`;
    return;
  }

  // Loop through items, turn them into HTML, and join them into a single string
  const htmlItems = wishlistItems.map(item => wishlistTemplate(item)).join('');
  
  // Inject the HTML string into our list container
  container.innerHTML = htmlItems;
}

renderWishlist();