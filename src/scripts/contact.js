// contact.js
// Handles contact form submission

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  // Infer portfolio and GitHub links
  const githubUser = window.CONFIG?.githubUser || "fauxtix";
  const portfolioUrl = `https://${githubUser}.github.io/GitHubPortfolio/`;
  const githubUrl = `https://github.com/${githubUser}`;
  // Professional English template
  const subject = encodeURIComponent(
    ".NET / C# / Blazor Developer Available for Projects — " + name,
  );
  const body = encodeURIComponent(
    `Hello [Recruiter or Manager Name],\n\n` +
      `I'm reaching out because I know that [Company Name] often manages robust projects in the Microsoft ecosystem, and I'd like to offer my availability to strengthen your development team.\n\n` +
      `I am a freelance developer with strong experience across the .NET stack (C#, .NET Core, Web API) and specialize in building dynamic interfaces with Blazor (Server and WebAssembly). I can deliver complete applications without the need for complex JavaScript frameworks, ensuring clean, maintainable code.\n\n` +
      `Here are links to my technical portfolio and main repositories:\n` +
      `Portfolio: ${portfolioUrl}\n` +
      `GitHub / GitLab: ${githubUrl}\n\n` +
      (message ? `Message: ${message}\n\n` : "") +
      `If you have any current or upcoming projects that need immediate support in .NET/Blazor, I would be very interested in collaborating. Can we schedule a quick call to align expectations?\n\n` +
      `Best regards,\n` +
      `${name}\n` +
      `${email}\n` +
      `[Your Phone]\n` +
      `[LinkedIn Link]`,
  );
  window.location.href = `mailto:${window.CONFIG?.contactEmail || "fauxtix.luix@hotmail.com"}?subject=${subject}&body=${body}`;
});
