const reposContainer = document.getElementById("repos-container");
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in ms

function getAuthHeaders() {
  const token = sessionStorage.getItem("github_token");
  return token ? { Authorization: `token ${token}` } : {};
}

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
  localStorage.setItem(key, JSON.stringify({ value, expires: Date.now() + CACHE_DURATION }));
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

async function fetchRepos() {
  const url = `https://api.github.com/users/${CONFIG.githubUser}/repos`;
  return fetchWithCache(url, { headers: getAuthHeaders() });
}

async function fetchIssues(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=all`;
  try {
    return await fetchWithCache(url, { headers: getAuthHeaders() });
  } catch {
    return [];
  }
}

async function fetchPRs(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;
  try {
    return await fetchWithCache(url, { headers: getAuthHeaders() });
  } catch {
    return [];
  }
}

function createCard(repo, issues, prs) {
  const card = document.createElement("div");
  card.className = "issues-prs-card";
  card.innerHTML = `
    <h2 class="issues-prs-title">${repo.name}</h2>
    <div class="issues-prs-flex">
      <div class="issues-col">
        <div class="issues-prs-header">🐞 Issues <span class="issues-badge">${issues.length}</span></div>
        <ul class="issues-prs-list">
          ${issues.length ? issues.map(issue => `<li><a href="${issue.html_url}" target="_blank">#${issue.number}: ${issue.title}</a></li>`).join("") : '<li style="opacity:0.6;">None</li>'}
        </ul>
      </div>
      <div class="issues-prs-divider"></div>
      <div class="prs-col">
        <div class="issues-prs-header">🔀 Pull Requests <span class="prs-badge">${prs.length}</span></div>
        <ul class="issues-prs-list">
          ${prs.length ? prs.map(pr => `<li><a href="${pr.html_url}" target="_blank">#${pr.number}: ${pr.title}</a></li>`).join("") : '<li style="opacity:0.6;">None</li>'}
        </ul>
      </div>
    </div>
  `;
  return card;
}

async function main() {
  reposContainer.innerHTML = "<p>Loading...</p>";
  try {
    const repos = await fetchRepos();
    // Use the new grid container
    reposContainer.innerHTML = '<div class="issues-prs-grid"></div>';
    const grid = reposContainer.querySelector('.issues-prs-grid');
    let shown = 0;
    for (const repo of repos) {
      const [issues, prs] = await Promise.all([
        fetchIssues(repo.owner.login, repo.name),
        fetchPRs(repo.owner.login, repo.name),
      ]);
      const filteredIssues = issues.filter((i) => !i.pull_request);
      if (filteredIssues.length === 0 && prs.length === 0) continue;
      const card = createCard(repo, filteredIssues, prs);
      grid.appendChild(card);
      shown++;
    }
    if (shown === 0) {
      grid.innerHTML = '<div style="text-align:center;opacity:0.7;">No repositories with issues or pull requests found.</div>';
    }
  } catch (e) {
    reposContainer.innerHTML = `<p>Error: ${e.message}</p>`;
  }
}

main();
