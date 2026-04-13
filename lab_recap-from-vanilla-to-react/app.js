const userListContainer = document.getElementById("user-list-container");
const loadMoreBtn = document.getElementById("load-more-btn");

let skip = 0;
const limit = 10;

async function fetchAndRenderUsers() {
    loadMoreBtn.textContent = "Loading...";
    loadMoreBtn.disabled = true;

    try {
        const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
        const jsonResponse = await response.json();
        const users = jsonResponse.users;

        users.forEach((user) => {
            const userCard = document.createElement("div");
            userCard.className = "user-card";
            userCard.innerHTML = `
                <img src="${user.image}" alt="${user.firstName}" />
                <p>${user.firstName} ${user.lastName}</p>
            `;
            userListContainer.appendChild(userCard);
        });

    } catch (error) {
        console.error("Failed to fetch users:", error);
    } finally {
        loadMoreBtn.textContent = "Load More";
        loadMoreBtn.disabled = false;
    }
}
loadMoreBtn.addEventListener("click", fetchAndRenderUsers);

fetchAndRenderUsers();