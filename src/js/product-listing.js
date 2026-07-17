import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { addToWishlist, getParam, loadHeaderFooter, qs } from "./utils.mjs";

// 1. Get the category from the URL instead of hardcoding "tents"
const category = getParam("category");

// 2. Instantiate with the category (ProductData will now handle the API call)
const dataSource = new ProductData();
const listElement = qs(".product-list");
const myList = new ProductList(category, dataSource, listElement);

async function init() {
  await loadHeaderFooter();
  await myList.init();

  // Update the title dynamically based on the category
  const titleElement = document.querySelector("#product-title");
  if (titleElement) {
    titleElement.innerHTML = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }

  // Event Delegation for wishlist
  listElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("wishlist-btn")) {
      const btn = e.target;
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: btn.dataset.price,
        image: btn.dataset.img,
      };
      const wasAdded = addToWishlist(product);
      alert(
        wasAdded
          ? `🎉 ${product.name} added!`
          : `👀 ${product.name} is already there!`,
      );
    }
  });
}

init();
