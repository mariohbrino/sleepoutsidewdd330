import ShoppingCart from "../js/ShoppingCart.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
