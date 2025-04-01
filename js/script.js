const usersUrl = "https://jsonplaceholder.typicode.com/users";
const navUsers = document.getElementById("users");
const mainUsers = document.getElementById("main-users");
let data = [];

async function fetchProduct() {
  try {
    const response = await fetch(usersUrl);
    if (!response.ok)
      throw new Error(`Error fetching users: ${response.statusText}`);
    data = await response.json();
    showUsers(data);
    showAllUsers(data);
  } catch (error) {
    console.error("Fetch failed:", error);
    navUsers.innerHTML = `<li class="error">❌ Failed to load users. Try again later.</li>`;
    mainUsers.innerHTML = `<p class="error">❌ Error loading users, please try again.</p>`;
  }
}

function showUsers(users) {
  if (!users.length) return (navUsers.innerHTML = "<li>No users found</li>");

  navUsers.innerHTML = users
    .map(
      (user) => `
    <li><a href="#" onclick="showUserDetails(${user.id})">${user.name}</a></li>
  `
    )
    .join("");
}

function showAllUsers(users) {
  mainUsers.innerHTML = users
    .map(
      (user) => `
    <article id="user-${user.id}" class="user-article" onclick="toggleUserDetails(${user.id})">
      <h2>${user.name}</h2>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    
    <section class="user-details" style="display:none;">
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
        <p><strong>Company:</strong> ${user.company.name}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
    </section>
    </article>
  `
    )
    .join("");
}

function toggleUserDetails(userId) {
  const details = document.querySelector(`#user-${userId} .user-details`);
  details.style.display = details.style.display === "none" ? "block" : "none";
}

function showUserDetails(userId) {
  const user = data.find((user) => user.id === userId);
  mainUsers.innerHTML = `
    <article id="user-${user.id}" class="full-user">
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
const arrowIcon = showUsersBtn?.querySelector("i");

showUsersBtn?.addEventListener("click", () => {
  asideElement?.classList.toggle("active");
  arrowIcon?.classList.toggle("rotate");
});

fetchProduct();
