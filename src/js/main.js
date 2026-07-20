import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Modal functionality
const modal = document.getElementById("quick-view-modal");
const closeButton = document.getElementById("close-modal");

if (closeButton && modal) {
  closeButton.addEventListener("click", () => {
    modal.close();
  });
}
