import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData(); // Removed "tents" argument
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();
