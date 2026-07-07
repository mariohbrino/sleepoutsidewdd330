// src/js/main.js
import { qsAll, setClick, addToWishlist } from './utils.js';

function initWishlistHandlers() {
  // Find all wishlist buttons matching our product cards
  const wishlistButtons = qsAll('.wishlist-btn');

  wishlistButtons.forEach(button => {
    // Bind click/touch handlers to every single button uniquely
    setClick(button, () => {
      // Build a dynamic product entity from the dataset parameters stored in the HTML structure
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: button.dataset.price,
        image: button.dataset.img
      };

      const wasAdded = addToWishlist(product);

      if (wasAdded) {
        alert(`🎉 ${product.name} has been added to your wishlist!`);
      } else {
        alert(`👀 ${product.name} is already in your wishlist!`);
      }
    });
  });
}

// Run setup logic immediately upon module load
document.addEventListener('DOMContentLoaded', initWishlistHandlers);
// Fallback execute in case DOMContentLoaded has already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initWishlistHandlers();
}