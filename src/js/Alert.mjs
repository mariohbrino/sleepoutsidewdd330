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

    alerts.forEach((item) => {
  // Show only once
  if (localStorage.getItem("so-register-cta")) return;

  const banner = document.createElement("div");
  banner.classList.add("register-banner");

  banner.style.backgroundColor = item.background;
  banner.style.color = item.color;

  banner.innerHTML = `
    <p>${item.message}</p>

    <div class="register-actions">
      <button id="register-btn">Register</button>
      <button id="later-btn">Maybe Later</button>
    </div>
  `;

  section.appendChild(banner);

  banner
    .querySelector("#later-btn")
    .addEventListener("click", () => {
      localStorage.setItem("so-register-cta", "dismissed");
      banner.remove();
    });

  banner
    .querySelector("#register-btn")
    .addEventListener("click", () => {
      console.log("Register button clicked");
      localStorage.setItem("so-register-cta", "dismissed");

      // Registration feature will be implemented later.
      alert("Registration coming soon! Stay tuned for updates.");

      banner.remove();
    });
});

    // Inject into the main element.
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(section);
    }
  }
}
