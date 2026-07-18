import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  //Week02 Individual-Task2:Discount Indicator on Product Listing
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const percentOff = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
      100,
  );
  const discountBadge = isDiscounted
    ? `<span class="discount-indicator">${percentOff}% OFF</span>`
    : "";

  const retailPrice = isDiscounted
    ? `<span class="retail-price"><s>$${product.SuggestedRetailPrice.toFixed(2)}</s></span> `
    : "";

  return `<li class="product-card">
    <a href="${import.meta.env.BASE_URL}product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">
        ${retailPrice}$${product.FinalPrice.toFixed(2)} ${discountBadge}
      </p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
