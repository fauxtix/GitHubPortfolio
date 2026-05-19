// login.js
// Store token in sessionStorage after login

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const token = document.getElementById("token").value.trim();
    const errorMsg = document.getElementById("loginError");
    if (errorMsg) errorMsg.textContent = "";
    if (token) {
      // Validate token by calling the /user endpoint
      const CACHE_DURATION = window.CONFIG?.cacheDuration || 6 * 60 * 60 * 1000; // 6 hours in ms
      function getCache(key) {
        try {
          const cached = localStorage.getItem(key);
          if (!cached) return null;
          const { value, expires } = JSON.parse(cached);
          if (Date.now() > expires) {
            localStorage.removeItem(key);
            return null;
          }
          return value;
        } catch {
          return null;
        }
      }
      function setCache(key, value) {
        localStorage.setItem(
          key,
          JSON.stringify({ value, expires: Date.now() + CACHE_DURATION }),
        );
      }
      async function fetchWithCache(url, options = {}) {
        const cacheKey = `cache::${url}`;
        const cached = getCache(cacheKey);
        if (cached) return cached;
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
        const data = await res.json();
        setCache(cacheKey, data);
        return data;
      }
      try {
        const url = "https://api.github.com/user";
        let data;
        try {
          data = await fetchWithCache(url, {
            headers: { Authorization: `token ${token}` },
          });
        } catch (err) {
          showLoginError("Invalid token.");
          return;
        }
        if (data && data.login) {
          sessionStorage.setItem("github_token", token);
          window.location.href = "../../index.html";
        } else {
          showLoginError("Invalid token.");
        }
      } catch (err) {
        showLoginError("Network error. Try again.");
      }
    }
  });

function showLoginError(msg) {
  let errorMsg = document.getElementById("loginError");
  if (!errorMsg) {
    errorMsg = document.createElement("div");
    errorMsg.id = "loginError";
    errorMsg.style.color = "#c00";
    errorMsg.style.marginTop = "10px";
    document.getElementById("loginForm").appendChild(errorMsg);
  }
  errorMsg.textContent = msg;
}
