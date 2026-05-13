# 🚀 GitHubPortfolio

A responsive web portfolio to showcase your GitHub repositories, profile, and traffic insights. Built with **HTML**, **CSS**, and **JavaScript**.

---

## ✨ Features

- 📦 **Dynamic Repository Showcase:**  
  Fetches and displays your public GitHub repositories, including description, language, stars, forks, and last updated date.
- 👤 **Profile Integration:**  
  Loads your GitHub profile data (name, avatar, bio) into the site interface.
- 🔍 **Repository Search & Filter:**  
  Instantly search and filter repositories by name or description. Filter by language as available.
- 🌓 **Dark/Light Theme Toggle:**  
  Switch between light and dark modes, with user preference saved locally.
- 📄 **Project Modal with README:**  
  Click a project’s “Readme” button to open its README file in a modal for a quick view.
- 📱 **Mobile Friendly:**  
  Fully responsive layout and navigation.
- 🌐 **Multi-language Ready:**  
  Interface supports internationalization (currently in Portuguese).
- 📊 **Traffic Insights:**  
  View detailed traffic analytics (views & clones) for each repository in a modern dialog, including summary and tables. Requires login with a GitHub Personal Access Token (PAT).

---

## 🛡️ Authentication & Traffic Insights

- 🔑 **Login with GitHub Token:**  
  Access traffic data by logging in with a GitHub Personal Access Token (PAT). Your token is stored only in your browser session.
- 📊 **Traffic Dialog:**  
  Click the “Traffic” button on any repo card to view detailed analytics (total/unique views & clones, with tables for the last 14 days).

---

## 📁 Main Files & Structure

- `index.html` — Home page with top bar, search/filter UI, and repository grid.
- `profile.html` — Dedicated profile page with larger bio and avatar.
- `login.html` — Login page for entering your GitHub PAT.
- `app.js` — Core JavaScript for loading repositories, theme, search/filter, modals, traffic, and README.
- `config.js` — Configures the GitHub username (default: `fauxtix`).
- `style.css` — All theme and layout styling (compatible with Tailwind CSS).
- `/assets` — Images and other static assets (like your avatar).

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
