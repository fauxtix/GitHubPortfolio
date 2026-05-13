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
      try {
        const res = await fetch("https://api.github.com/user", {
          headers: { Authorization: `token ${token}` },
        });
        if (res.ok) {
          sessionStorage.setItem("github_token", token);
          window.location.href = "index.html";
        } else {
          const data = await res.json();
          showLoginError(data.message || "Invalid token.");
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
