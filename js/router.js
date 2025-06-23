window.addEventListener("hashchange", loadRoute);
window.addEventListener("DOMContentLoaded", loadRoute);

function loadRoute() {
  const route = location.hash.slice(2) || "link-opener";
  const app = document.getElementById("app");
  fetch(`tools/${route}.html`)
    .then((res) => {
      if (!res.ok) throw new Error("Tool not found");
      return res.text();
    })
    .then((html) => {
      app.innerHTML = html;
      if (route === "link-opener") {
        import("./link-opener.js").then((mod) => mod.init());
      }
    })
    .catch(() => {
      app.innerHTML = `<section class="not-found">Tool not found. <a href="#/link-opener">Go Home</a></section>`;
    });
}
