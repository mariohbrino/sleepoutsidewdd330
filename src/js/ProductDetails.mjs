import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  // FIX: Use PrimaryLarge for the product detail page
  productImage.src = product.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productSuggestedRetailPrice").textContent =
    `$${product.SuggestedRetailPrice} (suggested retail price)`;
  document.getElementById("productPrice").textContent =
    `$${product.FinalPrice} (sale price)`;
  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
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
