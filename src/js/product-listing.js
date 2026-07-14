import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

// Load header and footer components
loadHeaderFooter();

// 1. Get the category from the URL parameter
const category = getParam("category");

// 2. Set up the data source
const dataSource = new ProductData();

// 3. Select the HTML element for rendering
const listElement = document.querySelector(".product-list");

// 4. Initialize the ProductList with the category and data source
const myList = new ProductList(category, dataSource, listElement);

// 5. Finally call the init method to show the products
myList.init();
