# GitHubPortfolio

A responsive web portfolio that showcases your GitHub repositories, profile information, and supports live searching and filtering. Built with HTML, CSS, and JavaScript.

---

## Features

- **Dynamic Repository Showcase:**  
  Fetches and displays your public GitHub repositories, including description, primary language, stars, forks, and last updated date.

- **Profile Integration:**  
  Loads your GitHub profile data (name, avatar, bio) into the site interface.

- **Repository Search and Filter:**  
  Instantly search and filter visible repositories by name or description. Filter by language as available.

- **Dark/Light Theme Toggle:**  
  Switches between light and dark modes, with user preference saved locally.

- **Project Modal with README:**  
  Click a project’s “Readme” button to open its README file in a modal (if it exists) for a quick view.

- **Mobile Friendly:**  
  Fully responsive layout and navigation.

- **Multi-language Ready:**  
  The code and layout support internationalization, currently using Portuguese as the interface language.

---

## Main Files & Structure

- `index.html` — Home page displaying the top bar, search/filter UI, and main repository grid view.
- `profile.html` — Dedicated profile page with a larger bio and avatar.
- `app.js` — Core JavaScript logic for loading repositories, handling theme, search/filtering, modals, and fetching README files.
- `config.js` — Configures the GitHub username (default: `fauxtix`).
- `style.css` — All theme and layout styling (compatible with Tailwind CSS).
- `/assets` — Images and other static assets (like your avatar).

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fauxtix/GitHubPortfolio.git
   ```

2. **Set your GitHub username (optional):**
   Edit `config.js` if you wish to display a different user's portfolio.

3. **Run locally:**
   Open `index.html` in your browser directly or serve with a local web server (recommended for API requests).

---

## Customization

- Change the GitHub user in `config.js` to show a different portfolio.
- Update images and profile information as needed.
- Tailor the HTML or CSS for your branding.

---
## Author

[Fausto Luís](https://github.com/fauxtix)
