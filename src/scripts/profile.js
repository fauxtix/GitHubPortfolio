// profile.js

// List of supported platforms and fallback icons (you can replace emoji with SVG if desired)
const SOCIAL_PLATFORMS = {
  linkedin: { icon: "🔗", label: "LinkedIn" },
  twitter: { icon: "🐦", label: "Twitter" },
  website: { icon: "🌐", label: "Website" },
  blog: { icon: "📝", label: "Blog" },
  instagram: { icon: "📸", label: "Instagram" },
};

function getMergedSocials() {
  // Read socials from user settings in localStorage
  let userSocials = {};
  try {
    const userSettings = JSON.parse(localStorage.getItem("userSettings"));
    if (userSettings && userSettings.social) userSocials = userSettings.social;
  } catch {}
  // Read defaults from CONFIG
  const defaultSocials = window.CONFIG?.social || {};
  // Merge: user settings win
  return { ...defaultSocials, ...userSocials };
}

function renderSocialLinks() {
  const socials = getMergedSocials();
  const container = document.getElementById("social-links");
  if (!container) return;

  container.innerHTML = "";
  Object.entries(SOCIAL_PLATFORMS).forEach(([key, { icon, label }]) => {
    const url = socials[key];
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.title = label;
      a.style = "margin-right:12px; font-size:1.8rem;";
      a.innerText = icon;
      container.appendChild(a);
    }
  });
}

// Example: fetch and render profile info (customize to your app)
async function loadProfile() {
  try {
    const url = "https://api.github.com/users/fauxtix"; // You may want this dynamic/configurable
    const CACHE_DURATION = 6 * 60 * 60 * 1000;
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
    const data = await fetchWithCache(url);

    document.getElementById("name").textContent = data.name || data.login;
    document.getElementById("bio").textContent = data.bio || "No Bio available";
    document.querySelector(".avatar").src = data.avatar_url;
  } catch (e) {
    console.error("Error while loading profile:", e);
  }
}

// Run everything on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  loadProfile();
  renderSocialLinks();
});
