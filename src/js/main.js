// Attach the listener to a static container (e.g., the product list or body)
document.addEventListener("click", (event) => {
  // Check if the clicked element has the class "wishlist-btn"
  if (event.target.classList.contains("wishlist-btn")) {
    const button = event.target;

    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: button.dataset.price,
      img: button.dataset.img,
    };

    addToWishlist(product);
    alert(`${product.name} added to wishlist!`);
  }
});

function addToWishlist(product) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!wishlist.find((item) => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}
