const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await this.convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await this.convertToJson(response);
    return data.Result;
  }

  async convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
      return jsonResponse;
    }
    throw { name: "services", message: jsonResponse };
  }
}
