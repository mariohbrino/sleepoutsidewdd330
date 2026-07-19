import {
  getLocalStorage,
  loadHeaderFooter,
  setLocalStorage,
  updateCartCount,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachRemoveListeners();
}

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

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart");

  cartItems = cartItems.filter((item) => item.Id !== id);

  setLocalStorage("so-cart", cartItems);
  updateCartCount();

  renderCartContents();
  attachRemoveListeners();
}

function attachRemoveListeners() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.id);
    });
  });
}

loadHeaderFooter();
renderCartContents();
