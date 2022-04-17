// Global constants
const usersEndpoint = "https://jsonplaceholder.typicode.com/users";
const dataTable = document.getElementById("data-table");
const selectedUser = document.getElementById("selectedUser");
const modalContainer = document.getElementById("modal-container");

/**
 * Function for fetching all the users from the endpoint
 */
const fetchUser = async () => {
  // Showing the pulse loader while the data is loading
  dataTable.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  // Fetching the data
  try {
    const response = await fetch(usersEndpoint);
    const data = await response.json();

    // Setting the data to this function for
    // populating the table body
    displayUsers(data);
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Function for showing the filtered post for each users
 * This function takes the user id as an argument and request
 * to the api
 *
 * @param {string} userId
 */
const showFilteredPost = async (userId) => {
  // Showing the loader while loading the posts
  modalContainer.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  // Showing the loading state while filtering the user name with id
  selectedUser.innerText = "Loading...";

  try {
    // Getting the filtered posts
    const postEndpoint = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    const responseForPosts = await fetch(postEndpoint);
    const postData = await responseForPosts.json();

    // Getting the filtered user fullname
    const filteredUserEndpoint = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const responseForUser = await fetch(filteredUserEndpoint);
    const filteredUserData = await responseForUser.json();

    // Displaying the posts
    displayUserPosts(postData);

    // Displaying the user name in the Modal
    selectedUser.innerText = `${filteredUserData.name}'s posts`;
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Function that loop through all the users and show them in the
 * table body
 *
 * @param {arrays} users
 */
const displayUsers = (users) => {
  // Remove the loader in order to show loaded data
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

      // Adding classlist from the Bootstrap
      tableBody.classList.add("text-center");

      dataTable.appendChild(tableBody);
    });
  }
};

/**
 * Similar to the previous function, this function also iterates through
 * all the posts for the particular user
 *
 * @param {arrays} posts
 */
const displayUserPosts = (posts) => {
  // Removing the loading states
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

// Calling the fetch function for loading the data
fetchUser();
