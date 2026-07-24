import {
  calculateItemSubTotal,
  getLocalStorage,
  loadHeaderFooter,
  setLocalStorage,
  updateCartCount,
} from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <button class="remove-item" data-id="${item.Id}">✕</button>

      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimaryLarge}"
          alt="${item.Name}"
        />
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">Quantity: ${item.Quantity}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

export default class CartManager {
  constructor(key = "so-cart") {
    this.key = key;
  }

  init() {
    loadHeaderFooter();
    this.renderCartContents();
  }

  displayCheckout() {
    const cartItems = getLocalStorage(this.key);
    const subtotal = calculateItemSubTotal(cartItems);
    const subtotalElement = document.getElementById("subtotal-value");
    subtotalElement.innerHTML = `$${subtotal.toFixed(2)}`;
  }

  toggleCheckoutVisibility(cartItems, checkoutBoxElement) {
    if (cartItems.length === 0) {
      checkoutBoxElement.classList.add("checkout-hidden");
    } else {
      checkoutBoxElement.classList.remove("checkout-hidden");
    }
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const checkoutBoxElement = document.getElementById("checkout_box");

    this.toggleCheckoutVisibility(cartItems, checkoutBoxElement);

    if (cartItems.length === 0) {
      document.getElementById("products_cart").innerHTML = `
        <div class="empty-search-fallback">
          <h3>No products added to the cart</h3>
        </div>
      `;
      return;
    } else {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
      this.attachRemoveListeners();
      this.displayCheckout();
    }
  }

  attachRemoveListeners() {
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => {
        this.removeFromCart(button.dataset.id);
      });
    });
  }

  removeFromCart(id) {
    let cartItems = getLocalStorage(this.key);

    cartItems = cartItems.filter((item) => item.Id !== id);

    setLocalStorage(this.key, cartItems);
    updateCartCount();

    this.renderCartContents();
    this.attachRemoveListeners();
  }
}
