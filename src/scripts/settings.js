// settings.js
// Handles loading, saving, and resetting user settings

const SOCIAL_KEYS = ["linkedin", "twitter", "website", "blog", "instagram"];

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

  // Helper: Social fields from form
  function getSocialInputs(form) {
    return SOCIAL_KEYS.reduce((obj, key) => {
      obj[key] = form[`social_${key}`];
      return obj;
    }, {});
  }

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

    // Social: Merge defaults and user overrides, user wins
    const socialInputs = getSocialInputs(form);
    const mergedSocial = Object.assign(
      {},
      defaults.social || {},
      userSettings.social || {},
    );
    SOCIAL_KEYS.forEach((key) => {
      if (socialInputs[key]) {
        socialInputs[key].value = mergedSocial[key] || "";
      }
    });
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
        // Social
        const socialInputs = getSocialInputs(form);
        SOCIAL_KEYS.forEach((key) => {
          if (socialInputs[key]) socialInputs[key].value = "";
        });
      }
    }
  }
  tryFillForm(0);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const socialInputs = getSocialInputs(form);
    // Only store non-empty socials
    const social = {};
    SOCIAL_KEYS.forEach((key) => {
      const val = socialInputs[key] ? socialInputs[key].value.trim() : "";
      if (val) social[key] = val;
    });
    const settings = {
      githubUser: form.githubUser.value.trim(),
      contactEmail: form.contactEmail.value.trim(),
      cacheDuration: Number(form.cacheDuration.value) * 60 * 60 * 1000,
      social,
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
        // Social
        const socialInputs = getSocialInputs(form);
        SOCIAL_KEYS.forEach((key) => {
          if (socialInputs[key]) socialInputs[key].value = "";
        });
      }
      return;
    }
    fillForm({}, defaults);
    msg.textContent = "Settings reset to defaults.";
  });
});
