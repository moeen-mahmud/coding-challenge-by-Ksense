// Global constant
const usersEndpoint = "https://jsonplaceholder.typicode.com/users";
const dataTable = document.getElementById("data-table");
const selectedUser = document.getElementById("selectedUser");
const modalContainer = document.getElementById("modal-container");

// Fetch all the users from the api
const fetchUser = async () => {
  try {
    const response = await fetch(usersEndpoint);
    const data = await response.json();
    console.log(data);
    displayUsers(data);
  } catch (err) {
    console.log(err.message);
  }
};

// Show posts for a selected user
const showFilteredPost = async (userId) => {
  try {
    const postEndpoint = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    const filteredUserEndpoint = `https://jsonplaceholder.typicode.com/users/${userId}`;

    const responseForPosts = await fetch(postEndpoint);
    const postData = await responseForPosts.json();

    const responseForUser = await fetch(filteredUserEndpoint);
    const filteredUserData = await responseForUser.json();

    console.log(postData);
    console.log(filteredUserData.name);
    displayUserPosts(postData);
    selectedUser.innerText = filteredUserData.name;
  } catch (err) {
    console.log(err.message);
  }
};

const displayUsers = (users) => {
  if (users?.length !== 0) {
    users?.forEach((user) => {
      const userId = user?.id;
      const userFullName = user?.name;
      const userEmail = user?.email;

      const tableBody = document.createElement("tbody");
      tableBody.innerHTML = `
        <tr class="text-center">
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
        </tr>
      `;

      dataTable.appendChild(tableBody);
    });
  }
};

const displayUserPosts = (posts) => {
  if (posts?.length !== 0) {
    posts?.forEach((post) => {
      const postTitle = post?.title;
      const postBody = post?.body;

      const postsDivisions = document.createElement("div");
      postsDivisions.innerHTML = `
        <div class="p-3 rounded border mb-3" >
          <h4>${postTitle}</h4>
          <p class="mb-2 text-secondary">${postBody}</p>
        </div>
      `;
      modalContainer.appendChild(postsDivisions);
    });
  }
};

fetchUser();
