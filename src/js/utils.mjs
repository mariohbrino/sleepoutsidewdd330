// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  try {
    const parsedData = JSON.parse(data);
    if (Array.isArray(parsedData)) {
      return parsedData;
    }
  } catch (error) {
    localStorage.setItem(key, JSON.stringify([]));
  }
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

// Refactored convertToJson to handle detailed error messages
export async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
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

  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
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

// Added for Stage 5: Unhappy Path
export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
      main.removeChild(this);
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}
