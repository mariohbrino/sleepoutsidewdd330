import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

//Wk03:Product Search UI Formatting result and filtering all products
const storeCategories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

const topCategoryHeading = (categoryName) => {
  const categories = [
    { id: "tents", name: "Tents" },
    { id: "backpacks", name: "Backpacks" },
    { id: "sleeping-bags", name: "Sleeping Bags" },
    { id: "hammocks", name: "Hammocks" },
  ];
  const topProductsElement = document.getElementById("top-products");

  // Wk03: Product Search UI formatting and displaying the search result
  const foundCategory = categories.find((c) => c.id === categoryName);

  if (foundCategory) {
    topProductsElement.textContent = `Top Products: ${foundCategory.name}`;
  } else {
    const decodeSearch = decodeURI(categoryName);
    const formattedSearch = decodeSearch
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    topProductsElement.textContent = `Search Results: "${formattedSearch}"`;
  }
};

//Downloading all the products for filtering!
async function initPage() {
  const categoryParam = getParam("category") || "tents";
  const listElement = document.getElementById("product-list");

  loadHeaderFooter();
  topCategoryHeading(categoryParam);

  //checking URL paramater and normal category
  if (storeCategories.includes(categoryParam)) {
    const products = new ProductData(categoryParam);
    const productList = new ProductList(categoryParam, products, listElement);
    productList.init();
  } else {
    //The search beahavior is to fetch everyring and fiter it
    const searchTerm = decodeURI(categoryParam).toLowerCase();
    let allProducts = [];

    //looping through all categories to get full product
    for (const cat of storeCategories) {
      const categoryData = new ProductData(cat);
      const productsArray = await categoryData.getData();
      //combining everything into a list
      allProducts = allProducts.concat(productsArray);
    }

    //sifting through to find matches in name field
    const searchResults = allProducts.filter((product) =>
      product.Name.toLowerCase().includes(searchTerm),
    );

    //Ensuring that the filtered array is used
    const customDataSource = {
      getData: async () => searchResults,
    };

    // Loadinf the results onto the page
    const productList = new ProductList(
      categoryParam,
      customDataSource,
      listElement,
    );
    productList.init();
  }
}

// calling the function
initPage();
