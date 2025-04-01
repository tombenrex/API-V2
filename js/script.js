const usersUrl = "https://jsonplaceholder.typicode.com/users";
const navUsers = document.getElementById("users");
const mainUsers = document.getElementById("main-users");

let data = [];

async function fetchProduct() {
  try {
    const response = await fetch(usersUrl);
    if (!response.ok) {
      throw new Error(
        `Error fetching product: ${response.status} - ${response.statusText}`
      );
    }
    data = await response.json();
    showUsers(data);
    showAllUsers(data);
  } catch (error) {
    console.error("Fetch failed:", error.message);
    if (navUsers) {
      navUsers.innerHTML += `<li class="error">❌ Failed to load users. Try again later.</li>`;
    }
    if (mainUsers) {
      mainUsers.innerHTML += `<p class="error">❌ Error loading users, please try again.</p>`;
    }
  }
}

function showUsers(users) {
  if (!navUsers || !mainUsers) return;

  navUsers.innerHTML = "";

  if (!users.length) {
    navUsers.innerHTML = "<li>No users found</li>";
    return;
  }

  users.forEach((user) => {
    const userItem = document.createElement("li");
    const userLink = document.createElement("a");
    userLink.href = "#";
    userLink.textContent = user.name;
    userItem.appendChild(userLink);
    navUsers.appendChild(userItem);

    userLink.addEventListener("click", (event) => {
      event.preventDefault();
      showUserDetails(user);
    });
  });
}

function showAllUsers(users) {
  if (!mainUsers) return;
  mainUsers.innerHTML = "";

  users.forEach((user) => {
    const userArticle = document.createElement("article");
    userArticle.id = `user-${user.id}`;
    userArticle.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;
    mainUsers.appendChild(userArticle);
  });
}

function showUserDetails(user) {
  if (!mainUsers) return;

  mainUsers.innerHTML = `
    <article class="full-user" id="user-${user.id}">
      <h2>${user.name}</h2>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
      <p><strong>Company:</strong> ${user.company.name}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
    </article>
  `;
}
const showUsersBtn = document.getElementById("show-users-btn");
const asideElement = document.querySelector("aside");
const arrowIcon = showUsersBtn.querySelector("i");

if (showUsersBtn && asideElement && arrowIcon) {
  showUsersBtn.addEventListener("click", () => {
    asideElement.classList.toggle("active");
    arrowIcon.classList.toggle("rotate");
  });
}

fetchProduct();
