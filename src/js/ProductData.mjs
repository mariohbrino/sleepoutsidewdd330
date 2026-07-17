const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  constructor() {
    // No path or category needed here anymore
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await this.convertToJson(response);
    return data.Result; // API returns data wrapped in a Result property
  }

  async convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: "services", message: jsonResponse };
    }
  }
}
