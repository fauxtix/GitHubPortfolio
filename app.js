const toggleThemeButton = document.getElementById("toggleTheme");
const repoGrid = document.getElementById("repoGrid");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const searchInput = document.getElementById("searchInput");
const languageFilter = document.getElementById("languageFilter");

let repositories = [];

/* THEME */
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";

  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

function initializeTheme() {
  const saved = localStorage.getItem("theme");

  if (saved) return applyTheme(saved);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

toggleThemeButton.addEventListener("click", toggleTheme);

/* GITHUB */
async function loadRepositories() {
  const res = await fetch(
    `https://api.github.com/users/${CONFIG.githubUser}/repos?sort=updated`,
  );

  const data = await res.json();

  repositories = data;

  renderRepositories(repositories);
  populateLanguages(repositories);
}

/* RENDER */
function renderRepositories(repos) {
  repoGrid.innerHTML = "";

  repos.forEach((repo) => {
    const card = document.createElement("div");
    card.className = "repo-card";

    card.innerHTML = `
      <div class="repo-header">
        <h2 class="repo-title">${repo.name}</h2>

        <span class="repo-language">
          ${repo.language || "Unknown"}
        </span>
      </div>

      <p class="repo-description">
        ${repo.description || "No description provided."}
      </p>
      <hr/>

      <div class="repo-meta">
        <span>⭐ ${repo.stargazers_count}</span>
        <span>🍴 ${repo.forks_count}</span>
        <span>🕒 ${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>

      <div class="repo-actions">
        <button
          class="read-more"
          data-owner="${repo.owner.login}"
          data-repo="${repo.name}"
        >
          Readme
        </button>

        <a
          href="${repo.html_url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          View repo
        </a>
      </div>
    `;

    repoGrid.appendChild(card);
  });

  bindReadMoreButtons();
}

/* README */
async function loadReadme(owner, repo) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
  );

  if (!res.ok) return "<p>README não encontrado</p>";

  const data = await res.json();
  const markdown = decodeURIComponent(
    Array.from(atob(data.content))
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(""),
  );

  const html = marked.parse(markdown);

  return `
  <div class="markdown-body">
    ${html}
  </div>
`;
}

/* BUTTONS */
function bindReadMoreButtons() {
  document.querySelectorAll(".read-more").forEach((btn) => {
    btn.onclick = async () => {
      modal.classList.remove("hidden");
      modalBody.innerHTML = "<p>Loading...</p>";

      modalBody.innerHTML = await loadReadme(
        btn.dataset.owner,
        btn.dataset.repo,
      );
    };
  });
}

/* FILTER */
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();

  renderRepositories(
    repositories.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q),
    ),
  );
});

/* MODAL */
closeModal.onclick = () => modal.classList.add("hidden");

modal.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};

/* INIT */
async function init() {
  initializeTheme();
  await loadProfile();
  await loadRepositories();
}

async function loadProfile() {
  try {
    const res = await fetch(
      "https://api.github.com/users/" + CONFIG.githubUser,
    );
    const data = await res.json();

    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("name").textContent = data.name || data.login;
    document.getElementById("bio").textContent =
      data.bio || "Sem bio disponível";
  } catch (e) {
    console.error("Erro ao carregar perfil:", e);
  }
}

init();
