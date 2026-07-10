import { addToWishlist } from "./utils.mjs";

function initWishlistHandlers() {
  // Use the parent container to listen for clicks on any wishlist button
  const productListContainer = document.querySelector(".product-list");

  if (!productListContainer) return;

  productListContainer.addEventListener("click", (event) => {
    // Only proceed if the element clicked is a wishlist button
    if (event.target.matches(".wishlist-btn")) {
      const button = event.target;

      // Build the product entity from the button's data attributes
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: button.dataset.price,
        image: button.dataset.img,
      };

      const wasAdded = addToWishlist(product);

      if (wasAdded) {
        alert(`🎉 ${product.name} has been added to your wishlist!`);
      } else {
        alert(`👀 ${product.name} is already in your wishlist!`);
      }
    }
  });
}

// Initialize the handler
initWishlistHandlers();
