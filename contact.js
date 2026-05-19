// contact.js
// Handles contact form submission

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  // Compose mailto link
  const subject = encodeURIComponent("Contact from Portfolio: " + name);
  const body = encodeURIComponent(
    "Name: " + name + "\nEmail: " + email + "\n\n" + message,
  );
  window.location.href = `mailto:fauxtix.luix@hotmail.com?subject=${subject}&body=${body}`;
});
