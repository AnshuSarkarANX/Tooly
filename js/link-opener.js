import { showModal } from "./modal.js";

export function init() {
  const createBtn = document.getElementById("createBtn");
  const groupInput = document.getElementById("groupSize");
  const inputBox = document.getElementById("linkInput");
  const output = document.getElementById("outputButtons");

  createBtn.onclick = () => {
    const raw = inputBox.value;
    const links = extractLinks(raw);
    const httpLinks = links.filter((link) => link.startsWith("http://"));
    const httpsLinks = links.filter((link) => link.startsWith("https://"));
    const groupSize = Math.max(1, parseInt(groupInput.value) || 4);

    output.innerHTML = "";

    const chunks = chunkArray(httpsLinks, groupSize);
    chunks.forEach((group, i) => {
      const btn = document.createElement("button");
      btn.textContent = `Open Group ${i + 1}`;
      btn.onclick = () => {
        group.forEach((link, index) => {
          setTimeout(() => {
            const newTab = window.open(link, "_blank");
            if (!newTab) {
              alert("Popup blocked! Please allow popups for this site.");
            }
          }, index * 500); // 700ms delay between each link
        });
      };
      
      
      
      
      output.appendChild(btn);
    });

    if (httpLinks.length) {
      const btn = document.createElement("button");
      btn.textContent = `⚠ Open Unsecured (${httpLinks.length})`;
      btn.classList.add("unsecured");
      btn.onclick = () => {
        showModal(
          "You are about to open unsecured (http) links. Continue?",
          () => {
            httpLinks.forEach((link) => window.open(link, "_blank"));
          }
        );
      };
      output.appendChild(btn);
    }
  };
}

function extractLinks(text) {
  const pattern = /(https?:\/\/[^\s]+)/g;
  const matched = text.match(pattern) || [];
  const knownShorteners = [
    "bit.ly",
    "t.co",
    "tinyurl.com",
    "shorturl.at",
    "rb.gy",
  ];
  const additional = text
    .split("//")
    .slice(1)
    .map((part) => "//" + part.split(/\s|\n/)[0])
    .filter((url) => knownShorteners.some((s) => url.includes(s)));
  return [...new Set([...matched, ...additional])];
}

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
