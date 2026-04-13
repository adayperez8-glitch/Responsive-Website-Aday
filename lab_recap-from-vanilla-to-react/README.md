# lab_recap-from-vanilla-to-react

![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | From Vanilla JS to React

## Learning Goals

After this exercise, you will be able to:

- Build a UI from scratch using HTML and CSS.
- Manipulate the DOM to dynamically display data fetched from an API.
- Use `async/await` to handle asynchronous JavaScript operations.
- Refactor a vanilla JavaScript application into a modern React component.
- Manage application state and user events in React using hooks like `useState` and `useEffect`.

<br>

## Requirements

- Fork this repo.
- Clone this repo.

<br>

## Submission

- Upon completion, run the following commands:

```shell
$ git add .
$ git commit -m "Solved lab"
$ git push origin master
```

- Create a Pull Request so that your TAs can check your work.

<br>

## Test Your Code

For this lab, your browser is your testing environment! There are no pre-written unit tests. You will verify your code is working by:

1.  Opening your `index.html` file using the **Live Server** VSCode extension.
2.  Checking the browser to see if your user profiles display correctly.
3.  Opening the **Console in the Developer Tools** to check for any errors.

This process of visual confirmation and console-checking is a fundamental skill for every web developer.

<br>

## Instructions

In this lab, we will build a small application that fetches user data from an external API and displays it. We'll start with plain HTML, CSS, and JavaScript, and then refactor it into a more powerful and maintainable React application. This will solidify your understanding of how all these technologies connect.

<br>

### Iteration 0 – Project Setup

First, let's create the basic file structure for our project. Inside the root of the lab folder, create the following files and folders:

```
/
|-- index.html
|-- style.css
|-- app.js
```

This simple structure is all we need for the first part of our lab.

<br>

### Iteration 1 – The Static Foundation (HTML & CSS)

Let's lay down the skeleton of our application. We need an HTML file for the structure and a CSS file for the styling.

Your goal is to create a simple page with a title, a container for user cards, and a "Load More" button.

**In `index.html`:**

Copy and paste the following code. This sets up the basic structure and links our stylesheet and script file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Profiles</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header>
      <h1>User Profiles</h1>
    </header>
    <main>
      <div id="user-list-container">
        <!-- Users will be added here by JavaScript -->
      </div>
      <button id="load-more-btn">Load More</button>
    </main>
    <script src="app.js"></script>
  </body>
</html>
```

**In `style.css`:**

Copy and paste this CSS to make our application look clean and presentable.

```css
body {
  font-family: sans-serif;
  background-color: #f4f4f9;
  text-align: center;
}

#user-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 2rem 0;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 200px;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

button:disabled {
  background-color: #aaa;
}
```

At this point, if you open `index.html` with Live Server, you should see the title and the button, but no users. That's what we'll fix next!

<br>

### Iteration 2 – Fetch and Display Users with Vanilla JS

Now it's time to bring our page to life! We will use JavaScript to fetch user data from an API and dynamically create the user cards.

You'll be working in the **`app.js`** file.

Your task is to:

1.  Select the necessary DOM elements (`user-list-container` and `load-more-btn`).
2.  Create an `async` function that fetches data from `https://dummyjson.com/users`.
3.  For each user returned from the API, create a `div` with the class `user-card`.
4.  Populate the card with the user's image and name.
5.  Append the new card to the `user-list-container`.
6.  Add a click event listener to the button to trigger this function.

> [!TIP]
> Remember to handle the loading state by disabling the button during the fetch request to prevent multiple clicks. Use a `try...catch...finally` block for robust error handling.

<details>
<summary>Click for Solution</summary>

```javascript
// app.js

const userListContainer = document.getElementById("user-list-container");
const loadMoreBtn = document.getElementById("load-more-btn");
let skip = 0; // Keep track of how many users to skip for pagination
const limit = 10; // How many users to fetch at a time

// The function that fetches and renders users
async function fetchAndRenderUsers() {
  try {
    loadMoreBtn.textContent = "Loading...";
    loadMoreBtn.disabled = true;

    // 1. Fetch data from the API using skip and limit for pagination
    const response = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    );
    const jsonResponse = await response.json();
    const users = jsonResponse.users;

    // 2. Create and append elements for each user (DOM Manipulation)
    users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.className = "user-card";
      userCard.innerHTML = `
        <img src="${user.image}" alt="${user.firstName}" />
        <p>${user.firstName} ${user.lastName}</p>
      `;
      userListContainer.appendChild(userCard);
    });

    skip += limit; // Increase skip for the next fetch
  } catch (error) {
    console.error("Failed to fetch users:", error);
    userListContainer.innerHTML = "<p>Something went wrong!</p>";
  } finally {
    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.disabled = false;
  }
}

loadMoreBtn.addEventListener("click", fetchAndRenderUsers);

// Fetch the first batch of users on page load
fetchAndRenderUsers();
```

</details>

<br>

### Iteration 3 – Refactor to a React App

Our vanilla JS app works, but as apps grow, managing the DOM manually becomes complex. Let's refactor our project to use React, which makes managing UI state much easier.

First, set up a new React project. The quickest way is to use Vite. Open your terminal and run:

```shell
# npm 6.x
npm create vite@latest my-react-app --template react

# npm 7+, extra double-dash is needed:
npm create vite@latest my-react-app -- --template react
```

Navigate into your new project (`cd my-react-app`), install dependencies (`npm install`), and start the development server (`npm run dev`).

Your task is to recreate the user profile viewer as a React component.

1.  Delete the contents of `src/App.css` and replace them with the CSS from our `style.css` file.
2.  In `src/App.jsx`, create a component named `UserList`.
3.  Use the `useState` hook to manage an array of `users`, a `loading` boolean, and the `skip` count.
4.  Use the `useEffect` hook to fetch the initial batch of users when the component first mounts.
5.  Create a function `fetchUsers` that contains the `async/await` logic. When you get new users, append them to the existing `users` state array.
6.  Render the list of users by mapping over the `users` state array.
7.  Add a button that calls `fetchUsers` when clicked.

> [!CAUTION]
> When mapping over an array to create elements in React, don't forget to add a unique `key` prop to each element, like `<div key={user.id}>`. This helps React identify which items have changed, are added, or are removed.

<details>
<summary>Click for Solution</summary>

```jsx
// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure to copy your CSS into this file

function App() {
  // 1. State for our users, how many to skip, and loading status
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // 2. The function to fetch data
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );
      const jsonResponse = await response.json();
      // Add new users to the existing list
      setUsers((prevUsers) => [...prevUsers, ...jsonResponse.users]);
      setSkip((prevSkip) => prevSkip + limit);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Fetch initial data when the component first mounts
  useEffect(() => {
    fetchUsers();
  }, []); // Empty array means this runs only once

  // 4. Declarative JSX: We map over the state to render the UI
  return (
    <div className="App">
      <header>
        <h1>User Profiles</h1>
      </header>
      <main>
        <div className="user-list-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.image} alt={user.firstName} />
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          ))}
        </div>
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      </main>
    </div>
  );
}

export default App;
```

</details>

<br>

**Happy coding!** :heart:

<br>

## Extra Resources

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [React Docs: Quick Start](https://react.dev/learn)
- [Vite: Getting Started](https://vitejs.dev/guide/)
- [DummyJSON API](https://dummyjson.com/docs/users) - The API used in this lab.
