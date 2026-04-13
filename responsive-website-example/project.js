async function renderProject() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || 1;
 
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const post = await res.json();
 
  
    const words = post.title.split(" ");
    const title =
      words[0].charAt(0).toUpperCase() + words[0].slice(1) + " " + words[1];
 
    const categories = {
      1: "UI Design & App Development",
      2: "Web Development",
      3: "User Experience Design",
    };
    const dates = {
      1: "June 12, 2021",
      2: "March 5, 2022",
      3: "November 20, 2022",
    };
    const imgIndex = id <= 3 ? id : 1;
 
  
    document.title = `Circle Agency – ${title}`;
    document.querySelector(".project-hero h1").textContent = title;
    document.querySelector(".project-category").textContent =
      categories[id] || "Design & Development";
    document.querySelector(
      ".project-date"
    ).textContent = `Completed on ${dates[id] || "2022"}`;
    document.querySelector(".project-main-img").src =
      `./assets/projects-section/${imgIndex}.jpg`;
    document.querySelector(".project-main-img").alt = title;
 
  } catch (error) {
    console.log("Error cargando el proyecto:", error);
    window.location.href = "/";
  }
}
 
renderProject();