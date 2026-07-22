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
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
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

export function calculateItemSubTotal(cartItems) {
  let subtotal = 0;
  cartItems.forEach((item) => {
    const itemSubtotal = item.FinalPrice * item.Quantity;
    subtotal += itemSubtotal;
  });
  return subtotal;
}

export function calculateSummary(cartItems, rates) {
  let subtotal = 0;
  let taxesAmount = 0;
  let shippingAmount = 0;

  cartItems.forEach((item, index) => {
    const itemSubtotal = item.FinalPrice * item.Quantity;
    subtotal += itemSubtotal;
    if (index == 0) {
      shippingAmount += rates.shippingRate;
    } else {
      shippingAmount += rates.shippingRateAddicional;
    }
  });

  taxesAmount = subtotal * rates.taxRate;

  const orderTotal = subtotal + taxesAmount + shippingAmount;

  return {
    orderTotal,
    taxesAmount,
    shippingAmount,
  };
}
