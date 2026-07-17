import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  // Requirement Update: Use PrimaryLarge for the detail page image
  const productImage = document.getElementById("productImage");
  productImage.src = product.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  // Week02 Individual-Task 1: Add discount to product detail pages
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const percentOff = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
      100,
  );

  const retailPriceElement = document.getElementById(
    "productSuggestedRetailPrice",
  );
  if (retailPriceElement) {
    retailPriceElement.textContent = `$${product.SuggestedRetailPrice.toFixed(2)}`;
    if (isDiscounted) {
      retailPriceElement.classList.add("retail-price");
    }
  }

  const priceElement = document.getElementById("productPrice");
  if (priceElement) {
    priceElement.innerHTML = `$${product.FinalPrice.toFixed(2)} `;
    if (isDiscounted) {
      priceElement.innerHTML += `<span class="discount-indicator">${percentOff}% OFF</span>`;
    }
  }

  // API Note: Ensure Colors structure is still available
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
    // API Note: Ensure findProductById is calling the new API endpoint
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartList = getLocalStorage("so-cart") || [];
    cartList.push(this.product);
    setLocalStorage("so-cart", cartList);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}
