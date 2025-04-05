const usersUrl = "https://jsonplaceholder.typicode.com/users";
const navUsers = document.getElementById("nav-users");
const mainUsers = document.getElementById("main-users");

let data = [];

async function fetchUsers() {
  try {
    setLoadingState();
    const response = await fetch(usersUrl);

    if (!response.ok)
      throw new Error(`Error fetching users: ${response.statusText}`);

    data = await response.json();
    showUsers(data);
    showAllUsers(data);
  } catch (error) {
    setErrorState();
    console.error("Fetch failed:", error);
  }
}

function setLoadingState() {
  navUsers.innerHTML = `<li>Loading users...</li>`;
  mainUsers.innerHTML = `<p>Loading users...</p>`;
}

function setErrorState() {
  navUsers.innerHTML = `<li class="error">❌ Failed to load users. Try again later.</li>`;
  mainUsers.innerHTML = `<p class="error">❌ Error loading users, please try again.</p>`;
}

function showUsers(users) {
  navUsers.innerHTML = users.length
    ? `<ul>${users
        .map(
          (user) => `<li><a href="#" data-id="${user.id}">${user.name}</a></li>`
        )
        .join("")}</ul>`
    : "<p>No users found</p>";

  const userLinks = navUsers.querySelectorAll("a");
  userLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const userId = link.getAttribute("data-id");
      showUserDetails(Number(userId));

      mainUsers?.classList.add("active");
    });
  });
}

function showAllUsers(users) {
  mainUsers?.classList.remove("active");
  mainUsers.innerHTML = users
    .map(
      (user) => `
    <article id="user-${user.id}">
      <h2>${user.name}</h2>
      <span class="hover-text">Show more info</span>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <div class="user-extended">
        <p><strong>Address:</strong> ${user.address.city}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
      </div>
      
    </article>
  `
    )
    .join("");

  const userArticles = document.querySelectorAll('article[id^="user-"]');
  userArticles.forEach((article) => {
    article.addEventListener("click", () => {
      const userId = article.id.split("-")[1];
      toggleUserDetails(Number(userId));
    });
  });
}

function toggleUserDetails(userId) {
  const details = document.querySelector(`#user-${userId} .user-extended`);
  const hoverText = document.querySelector(`#user-${userId} .hover-text`);

  details?.classList.toggle("active");

  if (details?.classList.contains("active")) {
    hoverText.textContent = "Show less info";
  } else {
    hoverText.textContent = "Show more info";
  }
}

function showUserDetails(userId) {
  const user = data.find((user) => user.id === userId);
  mainUsers.innerHTML = `
    <article id="user-${user.id}" class="max-user">
      <h2>${user.name}</h2>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
      <p><strong>Company:</strong> ${user.company.name}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
      <button onclick="showAllUsers(data)">Go Back</button>
    </article>
  `;
}

const showUsersBtn = document.getElementById("show-users-btn");
const asideElement = document.querySelector("aside");
const arrowIcon = showUsersBtn?.querySelector("svg");

showUsersBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  asideElement?.classList.toggle("active");
  arrowIcon?.classList.toggle("rotate");
});

document.addEventListener("click", (e) => {
  if (!asideElement?.contains(e.target) || e.target.closest("a")) {
    asideElement?.classList.remove("active");
    arrowIcon?.classList.remove("rotate");
  }
});

setTimeout(() => {
  fetchUsers();
}, 2000);
