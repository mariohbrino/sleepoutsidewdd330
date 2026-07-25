import Alert from "./Alert.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

//WK04: Add Customizable alert to index.html(Promotional Banner)
const alertBanners = new Alert();
alertBanners.init();
