// Global constant
const endpoint = "https://jsonplaceholder.typicode.com/users";
const dataTable = document.getElementById("data-table");

// Fetch all the users from the api
const fetchUser = async () => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    displayUsers(data);
  } catch (err) {
    console.log(err.message);
  }
};

const displayUsers = (users) => {
  if (users.length !== 0) {
    users?.forEach((user) => {
      const userId = user?.id;
      const userFullName = user?.name;
      const userEmail = user?.email;

      const tableBody = document.createElement("tbody");
      tableBody.innerHTML = `
        <tr>
          <th scope="row">${userId}</th>
          <td>${userFullName}</td>
          <td>${userEmail}</td>
          <td>
            <button type="button" class="btn btn-primary">See Posts</button>
          </td>
        </tr>
      `;

      dataTable.appendChild(tableBody);
    });
  }
};

fetchUser();
