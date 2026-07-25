//WK04: Add Customizable alert to index.html(Promotional Banner)
export default class Alert {
  async init() {
    try {
      // Getting the data from the json file.
      const response = await fetch("/json/alerts.json");
      if (response.ok) {
        const alerts = await response.json();
        this.renderAlerts(alerts);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Alert banner failed to load:", error);
    }
  }

  renderAlerts(alerts) {
    //Stop running when no data.
    if (!alerts || alerts.length === 0) {
      return;
    }

    const section = document.createElement("section");
    section.classList.add("alert-list");

    // Looping through each alert in the JSON file
    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;

      // Adding little padding Styles
      p.style.padding = "10px";
      p.style.margin = "0";
      section.appendChild(p);
    });

    // Inject into the main element.
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(section);
    }
  }
}
