// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  // Retrieve the data from local storage
  const data = localStorage.getItem(key);

  // Try to retrieve the data from local storage
  try {
    const parsedData = JSON.parse(data);
    if (Array.isArray(parsedData)) {
      return parsedData;
    }
  } catch (error) {
    // If parsing fails, that means the data is not a valid JSON array
    // In that case, we can initialize it as an empty array
    localStorage.setItem(key, JSON.stringify([]));
  }

  // If the data is not an array or if parsing fails, return an empty array
  return [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export async function convertToJson(res) {
  const jsonResponse = await res.json();
  
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "serviceError", message: jsonResponse,};
  }
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const template = await response.text();

    return template;
  } catch (error) {
    // console.error(error);
  }
}

export async function loadHeaderFooter() {
  let baseUrl = import.meta.env.BASE_URL;
  let headerTemplate = await loadTemplate(baseUrl + "partials/header.html");
  let footerTemplate = await loadTemplate(baseUrl + "partials/footer.html");

  // Replace absolute paths with base URL prefixed paths
  const replaceAbsolutePaths = (template) =>
    template
      .replace(/href="\/sleepoutsidewdd330\//g, `href="${baseUrl}`)
      .replace(/src="\/sleepoutsidewdd330\//g, `src="${baseUrl}`)
      .replace(/href="\//g, `href="${baseUrl}`)
      .replace(/src="\//g, `src="${baseUrl}`);

  headerTemplate = replaceAbsolutePaths(headerTemplate);
  footerTemplate = replaceAbsolutePaths(footerTemplate);

  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  // Wk03-Individual-Task Report: Product Search Logic
  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault(); //stop page from reloading
      const searchTerm = document.getElementById("search-input").value;
      window.location.href = `${baseUrl}product_listing/index.html?category=${searchTerm}`;
    });
  }

  updateCartCount();
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = document.querySelector(".cart-count");

  if (cartCount) {
    cartCount.textContent = cartItems.length;

    if (cartItems.length === 0) {
      cartCount.style.display = "none";
    } else {
      cartCount.style.display = "inline-block";
    }
  }
}

// Convert a dollar amount to whole integer cents, avoiding floating point
// artifacts like 19.999999999999996 (see Number.EPSILON trick).
function toCents(value) {
  return Math.round((value + Number.EPSILON) * 100);
}

// Round a monetary value to 2 decimal places.
export function roundToCents(value) {
  return toCents(value) / 100;
}

export function calculateItemSubTotal(cartItems) {
  // Accumulate in integer cents inside the loop so repeated floating point
  // addition can't drift; only convert back to dollars once, at the end.
  let subtotalCents = 0;
  cartItems.forEach((item) => {
    subtotalCents += toCents(item.FinalPrice) * item.Quantity;
  });
  return subtotalCents / 100;
}

export function calculateSummary(cartItems, rates) {
  let subtotalCents = 0;
  let shippingCents = 0;

  cartItems.forEach((item, index) => {
    subtotalCents += toCents(item.FinalPrice) * item.Quantity;
    if (index == 0) {
      shippingCents += toCents(rates.shippingRate);
    } else {
      shippingCents += toCents(rates.shippingRateAddicional);
    }
  });

  const taxesCents = Math.round(subtotalCents * rates.taxRate);
  const orderTotalCents = subtotalCents + taxesCents + shippingCents;

  return {
    orderTotal: orderTotalCents / 100,
    taxesAmount: taxesCents / 100,
    shippingAmount: shippingCents / 100,
  };
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");

  alert.innerHTML = `
    <span>${message}</span>
    <button class="close-alert">X</button>
  `;

  alert.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-alert")) {
      this.remove();
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}
