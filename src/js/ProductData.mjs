import { convertToJson } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  constructor() {
    // Constructor no longer needs the category; it is passed to methods
  }

  // Fetch products by category from the API
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result; // API returns data inside a 'Result' property
  }

  // Fetch a single product by ID
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
