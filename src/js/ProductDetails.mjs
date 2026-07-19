import { getLocalStorage, setLocalStorage, updateCartCount, } from "./utils.mjs";

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  //Week02 Individual-Task 1: Add discount to product detail pages
  //1. calculating and handling the retail price
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const percentOff = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
      100,
  );
  const retailPriceElement = document.getElementById(
    "productSuggestedRetailPrice",
  );
  retailPriceElement.textContent = `$${product.SuggestedRetailPrice.toFixed(2)}`;
  if (isDiscounted) {
    retailPriceElement.classList.add("retail-price");
  }
  //2. Adding the final price and inject dicount badge
  const priceElement = document.getElementById("productPrice");
  priceElement.innerHTML = `$${product.FinalPrice.toFixed(2)} `;
  if (isDiscounted) {
    priceElement.innerHTML += `<span class="discount-indicator">${percentOff}% OFF</span>`;
  }
  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = product.Id;
}

export default class ProductDetail {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  addProductToCart() {
    const cartList = getLocalStorage("so-cart") || [];

    if (!cartList.some((item) => item.Id === this.product.Id)) {
      // Set the initial quantity to 1
      this.product.Quantity = 1;

      // Add the product to the cart list if it doesn't exist
      cartList.push(this.product);
    } else {
      // If product already exists in the cart, then increase the quantity by 1
      const existingProduct = cartList.find(
        (item) => item.Id === this.product.Id,
      );

      // Increase the quantity of the existing product
      existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;

      // Update the cart list with the modified product
      cartList.map((item) =>
        item.Id === this.product.Id ? existingProduct : item,
      );
    }

    setLocalStorage("so-cart", cartList);
    updateCartCount();
  }
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}
