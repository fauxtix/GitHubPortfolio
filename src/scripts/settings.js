// settings.js
// Handles loading, saving, and resetting user settings

function getDefaults() {
  return window.CONFIG || {};
}

function loadUserSettings() {
  let userSettings = {};
  try {
    userSettings = JSON.parse(localStorage.getItem("userSettings")) || {};
  } catch {}
  return userSettings;
}

function saveUserSettings(settings) {
  localStorage.setItem("userSettings", JSON.stringify(settings));
}

// Theme is handled globally, not in settings

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("settingsForm");
  const msg = document.getElementById("settingsMsg");
  const resetBtn = document.getElementById("resetBtn");

  function fillForm(userSettings, defaults) {
    form.githubUser.value =
      userSettings.githubUser || defaults.githubUser || "";
    form.contactEmail.value =
      userSettings.contactEmail || defaults.contactEmail || "";
    form.cacheDuration.value =
      ((userSettings.cacheDuration !== undefined
        ? userSettings.cacheDuration
        : defaults.cacheDuration) || "") /
      (60 * 60 * 1000);
  }

  let filled = false;
  function tryFillForm(attempts) {
    const userSettings = loadUserSettings();
    let defaults = getDefaults();
    if (window.CONFIG && defaults.githubUser) {
      fillForm(userSettings, defaults);
      filled = true;
    } else if (attempts < 30) {
      setTimeout(() => tryFillForm(attempts + 1), 33);
    } else {
      // If CONFIG never loads, show error and do not fill form
      if (msg)
        msg.textContent =
          "Error: Could not load configuration. Please check config.js.";
      if (form) {
        form.githubUser.value = "";
        form.contactEmail.value = "";
        form.cacheDuration.value = "";
      }
    }
  }
  tryFillForm(0);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const settings = {
      githubUser: form.githubUser.value.trim(),
      contactEmail: form.contactEmail.value.trim(),
      cacheDuration: Number(form.cacheDuration.value) * 60 * 60 * 1000,
    };
    saveUserSettings(settings);
    msg.textContent =
      "Settings saved! Reload the app to apply changes everywhere.";
  });

  resetBtn.addEventListener("click", function () {
    localStorage.removeItem("userSettings");
    localStorage.removeItem("theme");
    let defaults = getDefaults();
    if (!defaults.githubUser) {
      if (msg)
        msg.textContent =
          "Error: Could not load configuration. Please check config.js.";
      if (form) {
        form.githubUser.value = "";
        form.contactEmail.value = "";
        form.cacheDuration.value = "";
      }
      return;
    }
    fillForm({}, defaults);
    msg.textContent = "Settings reset to defaults.";
  });
});
