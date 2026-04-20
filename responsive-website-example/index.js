async function renderProjects() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=3"
    );
    const posts = await res.json();
 
    const titles = ["Simplify", "Dashcoin", "Vectorify"];
    const categories = [
      "UI Design & App Development",
      "Web Development",
      "User Experience Design",
    ];
 
    let html = "";
    posts.forEach((post, index) => {
      const title = titles[index];
 
      html += `
        <article class="project-card">
          <a class="project-wrapper" href="./project.html?id=${post.id}">
            <img
              class="img-project"
              src="./assets/projects-section/${index + 1}.jpg"
              alt="${title}"
            />
            <div class="project-inner-card">
              <h4 class="project-title">${title}</h4>
              <p class="project-description-capitalize">${categories[index]}</p>
              <span class="learn-more">Learn more</span>
            </div>
          </a>
        </article>`;
    });
 
    document.querySelector(".projects-container").innerHTML = html;
  } catch (error) {
    console.log("Error cargando proyectos:", error);
  }
}
 
renderProjects();
 
const hamburger = document.querySelector(".hamburger");
 
if (hamburger) {
  hamburger.addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("showMenu");
  });
}
 
const form = document.querySelector(".suscribe-form");
 
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
 
    const email = form.querySelector("input[type='email']").value.trim();
    if (!email) return;
 
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Suscripción enviada:", data);
 
        const btn = form.querySelector(".btn-suscribe");
        btn.textContent = "✓ Subscribed!";
        btn.style.backgroundColor = "#28a745";
        form.querySelector("input[type='email']").value = "";
 
        setTimeout(() => {
          btn.textContent = "Suscribe";
          btn.style.backgroundColor = "#072ac8";
        }, 3000);
      })
      .catch((err) => console.log("Error en suscripción:", err));
  });
}