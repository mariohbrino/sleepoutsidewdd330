import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Week02 Individual-Task2: Discount Indicator on Product Listing
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
      <img src="${product.Images.PrimaryLarge}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">
        ${retailPrice}$${product.FinalPrice.toFixed(2)} ${discountBadge}
      </p>
    </a>
    <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
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
    this.addEventListeners();
  }

  // Wk03: Product Search UI (Handling empty search results fallback)
  renderList(list) {
    // check for empty array
    if (list.length === 0) {
      // Then display message
      this.listElement.innerHTML = `
        <div class="empty-search-fallback">
          <h3>No products found</h3>
          <p>We couldn't find any products matching your search. Try checking your spelling or using a different word.</p>
        </div>
      `;
      return;
    }
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  addEventListeners() {
    // Event delegation on the parent list element
    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("quick-view-btn")) {
        const productId = e.target.dataset.id;
        this.handleQuickView(productId);
      }
    });
  }

  async handleQuickView(id) {
    // 1. Fetch the product details from your data source
    const product = await this.dataSource.findProductById(id);

    // 2. Select the modal elements
    const modal = document.getElementById("quick-view-modal");
    const nameEl = document.getElementById("modal-name");
    const imgEl = document.getElementById("modal-img");
    const priceEl = document.getElementById("modal-price");
    const descEl = document.getElementById("modal-description");

    // 3. Populate the modal with the product data
    if (nameEl) nameEl.textContent = product.Name;
    if (imgEl) {
      imgEl.src = product.Images.PrimaryLarge;
      imgEl.alt = product.Name;
    }
    if (priceEl) priceEl.textContent = `$${product.FinalPrice.toFixed(2)}`;
    if (descEl) descEl.innerHTML = product.DescriptionHtmlSimple;

    // 4. Open the modal
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  }
}
