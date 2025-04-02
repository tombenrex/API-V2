const usersUrl = "https://jsonplaceholder.typicode.com/users";
const navUsers = document.getElementById("nav-users");
const mainUsers = document.getElementById("main-users");
let data = [];

async function fetchUsers() {
  try {
    navUsers.innerHTML = `<li>Loading users...</li>`;
    mainUsers.innerHTML = `<p>Loading users...</p>`;
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
  if (!users.length) {
    navUsers.innerHTML = "<p>No users found</p>";
    return;
  }

  navUsers.innerHTML = `
    <ul>
      ${users
        .map(
          (user) =>
            `<li><a href="#" onclick="showUserDetails(${user.id})">${user.name}</a></li>`
        )
        .join("")}
    </ul>
  `;
}

function showAllUsers(users) {
  mainUsers.innerHTML = users
    .map(
      (user) => `
      
    
    <article id="user-${user.id}" class="user-article" onclick="toggleUserDetails(${user.id})">
      <h2>${user.name}</h2>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    <div class="user-extended">
        <p><strong>Address:</strong>  ${user.address.city}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
    </div>
    </article>
    
    
  `
    )
    .join("");
}

function toggleUserDetails(userId) {
  const details = document.querySelector(`#user-${userId} .user-extended`);
  if (!details) return;
  details.classList.toggle("active");
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
    <a href="#" onclick="showAllUsers(data)">Go Back</a>
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

fetchUsers();
