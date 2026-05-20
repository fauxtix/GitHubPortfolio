# 🚀 GitHubPortfolio

A responsive web portfolio to showcase your GitHub repositories, profile, and traffic insights. Built with **HTML**, **CSS**, and **JavaScript**.

## 🆕 New Features

- 📄 **Download Portfolio as PDF:**
  - Generate a professional PDF summary of your GitHub profile and repositories (with avatar, bio, repo table, and page numbers). Find this option in the navbar.
- ✉️ **Contact Form:**
  - Static contact form page that opens your email client to send a message. Also accessible from the navbar.

## ✨ Features

- ⚡ **Aggressive Caching:**  
  All GitHub API requests (repos, issues, PRs, profile, traffic, etc.) are now cached in localStorage for 6 hours, dramatically improving performance and reducing API rate limit usage.
- 📦 **Dynamic Repository Showcase:** Fetches and displays your public GitHub repositories, including description, language, stars, forks, and last updated date.
- 👤 **Profile Integration:** Loads your GitHub profile data (name, avatar, bio) into the site interface.
- 🔍 **Repository Search & Filter:** Instantly search and filter repositories by name or description. Filter by language as available.
- 🌓 **Dark/Light Theme Toggle:** Switch between light and dark modes, with user preference saved locally.
- 📄 **Project Modal with README:** Click a project’s “Readme” button to open its README file in a modal for a quick view.
- 📱 **Mobile Friendly:** Fully responsive layout and navigation.
- 🌐 **Multi-language Ready:** Interface supports internationalization (currently in Portuguese).
- 📊 **Traffic Insights:** View detailed traffic analytics (views & clones) for each repository in a modern dialog, including summary and tables. Requires login with a GitHub Personal Access Token (PAT).
- 🗂️ **Issues & PRs Dashboard:** Dedicated page with modern, responsive cards showing only repositories where you have open issues or pull requests. Cards feature gradient headers, theme-aware styles, and a professional layout.
- 📄 **Download Portfolio as PDF:**
  - Generate a professional PDF summary of your GitHub profile and repositories (with avatar, bio, repo table, and page numbers). Find this option in the navbar.
- ✉️ **Contact Form:**
  - Static contact form page that opens your email client to send a message. Also accessible from the navbar.
- 🎨 **Modern UI/UX:** Updated card layouts, navigation, and page titles for a consistent, modern look. Theme-aware anchor colors and gradient headers enhance visual appeal.
- 🧭 **Consistent Navigation:** Navigation bars are unified across all pages for a seamless experience.
- 🛡️ **Authentication:** Login and user validation now use the same caching logic for efficiency.

- ⚙️ **Settings Page:** Easily change the GitHub username, contact email, and cache duration from the settings page. All changes are saved in your browser and take effect instantly across the app.

---

## 🛡️ Authentication & Traffic Insights

- 🔑 **Login with GitHub Token:**  
  Access traffic data by logging in with a GitHub Personal Access Token (PAT). Your token is stored only in your browser session.
- 📊 **Traffic Dialog:**  
  Click the “Traffic” button on any repo card to view detailed analytics (total/unique views & clones, with tables for the last 14 days).

---

## 📁 Main Files & Structure

- `profile.html` — Dedicated profile page with larger bio and avatar.
- `app.js` — Core JavaScript for loading repositories, theme, search/filter, modals, traffic, and README.
- `config.js` — Configures the GitHub username (default: `fauxtix`).
- `style.css` — All theme and layout styling (compatible with Tailwind CSS).
- `issues-prs.html` — Dashboard for issues and pull requests, with dedicated CSS and modern card layout.
- `issues-prs.js` — Handles fetching, caching, and rendering of issues and PRs per repository.

---

## ⚙️ Configuration

- **Cache Duration:**  
  All API results are cached for 6 hours by default. You can adjust this in the `CACHE_DURATION` constant in the JavaScript files if you want fresher or older data.

---

## 🚦 Getting Started

1. **Clone the repository:**

   ```bash

   ```

2. **Set your GitHub username (optional):**
   Open `index.html` in your browser or serve with a local web server (recommended for API requests).

---

## 🛠️ Customization

## 📁 Project Structure

All source code and assets are organized for scalability and maintainability:

- `index.html` — Main entry point (home page)
- `src/pages/` — All HTML pages:
  - `contact.html` — Contact form (opens mail client)
  - `download.html` — Download portfolio as PDF
  - `issues-prs.html` — Issues & PRs dashboard
  - `login.html` — Login page for GitHub PAT
  - `profile.html` — Profile page
  - `settings.html` — User/configuration settings. Lets you change the GitHub username, contact email, and cache duration. Settings are saved in localStorage and affect the app's behavior instantly.
- `src/scripts/` — All JavaScript files:
  - `app.js` — Core logic (repos, theme, search, modals, traffic, README)
  - `config.js` — GitHub user/configuration
  - `contact.js` — Contact form logic
  - `download.js` — PDF generation
  - `issues-prs.js` — Issues & PRs logic
  - `login.js` — Login logic
  - `profile.js` — Profile logic
  - `settings.js` — Settings page logic
  - `theme.js` — Theme toggle and persistence
- `src/styles/` — All CSS files:
  - `style.css` — Main styles (theme, layout, components)
  - `issues-prs.css` — Issues & PRs page styles
- `src/assets/images/` — All images and SVGs (avatars, icons, etc.)
- `docs/` — Documentation (e.g., migration notes)

> **Note:** All asset and script paths in HTML files are updated to match this structure.

- Change the GitHub user in `config.js` to show a different portfolio.
- Update images and profile information as needed.
- Tailor the HTML or CSS for your branding.

---

## 👤 Author

[Fausto Luís](https://github.com/fauxtix)
