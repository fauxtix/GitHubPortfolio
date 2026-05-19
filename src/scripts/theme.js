// theme.js
// Ensures theme is applied on all pages, including login

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
}

function initializeTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return applyTheme(saved);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", initializeTheme);
