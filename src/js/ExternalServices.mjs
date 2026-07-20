import OrderResponse from "./OrderResponse.mjs";
import { convertToJson } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
  constructor(category) {
    this.category = category;
  }
  async getData() {
    const response = await fetch(`${baseURL}products/search/${this.category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(orderSummary) {
    const response = await fetch(`${baseURL}checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderSummary),
    });
    const data = await convertToJson(response);
    return new OrderResponse(data);
  }
}

// Add the checkout function here at the bottom
export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
}
