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
- 🎨 **Modern UI/UX:** Updated card layouts, navigation, and page titles for a consistent, modern look. Theme-aware anchor colors and gradient headers enhance visual appeal.
- 🧭 **Consistent Navigation:** Navigation bars are unified across all pages for a seamless experience.
- 🛡️ **Authentication:** Login and user validation now use the same caching logic for efficiency.

---

## 🛡️ Authentication & Traffic Insights

- 🔑 **Login with GitHub Token:**  
  Access traffic data by logging in with a GitHub Personal Access Token (PAT). Your token is stored only in your browser session.
- 📊 **Traffic Dialog:**  
  Click the “Traffic” button on any repo card to view detailed analytics (total/unique views & clones, with tables for the last 14 days).

---

## 📁 Main Files & Structure

- `download.html` — Download your portfolio as a PDF. Uses `download.js` for PDF generation.
- `download.js` — Handles PDF generation, formatting, and download (uses jsPDF, no backend required). Includes:
  - Avatar, name, and bio formatting
  - Repo table with proper page breaks, margins, and footers (date, page numbers)
  - Modern, readable layout
- `contact.html` — Contact form page (static, opens mail client).
- `contact.js` — Handles contact form submission.

- `index.html` — Home page with top bar, search/filter UI, and repository grid.
- `profile.html` — Dedicated profile page with larger bio and avatar.
- `login.html` — Login page for entering your GitHub PAT.
- `app.js` — Core JavaScript for loading repositories, theme, search/filter, modals, traffic, and README.
- `config.js` — Configures the GitHub username (default: `fauxtix`).
- `style.css` — All theme and layout styling (compatible with Tailwind CSS).
- `/assets` — Images and other static assets (like your avatar).
- `issues-prs.html` — Dashboard for issues and pull requests, with dedicated CSS and modern card layout.
- `issues-prs.js` — Handles fetching, caching, and rendering of issues and PRs per repository.
- `issues-prs.css` — Page-specific styles for the Issues & PRs dashboard.

---

## ⚙️ Configuration

- **Cache Duration:**  
  All API results are cached for 6 hours by default. You can adjust this in the `CACHE_DURATION` constant in the JavaScript files if you want fresher or older data.

---

## 🚦 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fauxtix/GitHubPortfolio.git
   ```

2. **Set your GitHub username (optional):**
   Edit `config.js` to display a different user's portfolio.

3. **Run locally:**
   Open `index.html` in your browser or serve with a local web server (recommended for API requests).

---

## 🛠️ Customization

- Change the GitHub user in `config.js` to show a different portfolio.
- Update images and profile information as needed.
- Tailor the HTML or CSS for your branding.

---

## 👤 Author

[Fausto Luís](https://github.com/fauxtix)
