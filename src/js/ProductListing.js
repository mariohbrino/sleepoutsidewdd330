import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const topCategoryHeading = (categoryName) => {
  const categories = [
    { id: "tents", name: "Tents" },
    { id: "backpacks", name: "Backpacks" },
    { id: "sleeping-bags", name: "Sleeping Bags" },
    { id: "hammocks", name: "Hammocks" },
  ];
  const topProductsElement = document.getElementById("top-products");

  // Wk03: Product Search UI formatting and displaying the search result
  const foundCategory = categories.find((c) => c.id === categoryName);

  if (foundCategory) {
    topProductsElement.textContent = `Top Products: ${foundCategory.name}`;
  } else {
    const decodeSearch = decodeURI(categoryName);
    const formattedSearch = decodeSearch
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    topProductsElement.textContent = `Search Results: ${formattedSearch}`;
  }
};

const category = getParam("category") || "tents";
const listElement = document.getElementById("product-list");
const products = new ProductData(category);

const productList = new ProductList(category, products, listElement);
loadHeaderFooter();
topCategoryHeading(category);
productList.init();
