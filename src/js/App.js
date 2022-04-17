// Global constant
const usersEndpoint = "https://jsonplaceholder.typicode.com/users";
const dataTable = document.getElementById("data-table");
const selectedUser = document.getElementById("selectedUser");
const modalContainer = document.getElementById("modal-container");

// Fetch all the users from the api
const fetchUser = async () => {
  dataTable.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  try {
    const response = await fetch(usersEndpoint);
    const data = await response.json();
    displayUsers(data);
  } catch (err) {
    console.log(err.message);
  }
};

// Show posts for a selected user
const showFilteredPost = async (userId) => {
  modalContainer.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  selectedUser.innerText = "Loading...";

  try {
    const postEndpoint = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    const filteredUserEndpoint = `https://jsonplaceholder.typicode.com/users/${userId}`;

    const responseForPosts = await fetch(postEndpoint);
    const postData = await responseForPosts.json();

    const responseForUser = await fetch(filteredUserEndpoint);
    const filteredUserData = await responseForUser.json();

    displayUserPosts(postData);
    selectedUser.innerText = `${filteredUserData.name}'s posts`;
  } catch (err) {
    console.log(err.message);
  }
};

// Displaying all the users
const displayUsers = (users) => {
  dataTable.textContent = "";
  if (users?.length !== 0) {
    users?.forEach((user) => {
      const userId = user?.id;
      const userFullName = user?.name;
      const userEmail = user?.email;

      const tableBody = document.createElement("tr");
      tableBody.innerHTML = `
          <th scope="row">${userId}</th>
          <td>${userFullName}</td>
          <td>${userEmail}</td>
          <td>
            <button onclick="showFilteredPost('${userId}')" 
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#showPostsModal"
            >
              See Posts
            </button>
          </td>
      `;
      tableBody.classList.add("text-center");
      dataTable.appendChild(tableBody);
    });
  }
};

const displayUserPosts = (posts) => {
  modalContainer.textContent = "";
  selectedUser.textContent = "";
  if (posts?.length !== 0) {
    posts?.forEach((post) => {
      const postTitle = post?.title;
      const postBody = post?.body;

      const postsDivisions = document.createElement("div");
      postsDivisions.innerHTML = `
        <div class="p-3 rounded border mb-3">
          <h4>${postTitle}</h4>
          <p class="mb-2 text-secondary">${postBody}</p>
        </div>
      `;
      modalContainer.appendChild(postsDivisions);
    });
  }
};

fetchUser();
