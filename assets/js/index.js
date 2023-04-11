const addForm = document.forms["add_user"];
const updateForm = document.forms["update_user"];

if (addForm) {
  addForm.addEventListener("submit", function () {
    alert("Data inserted");
  });
}

if (updateForm) {
  updateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = e.target.getAttribute("data-id");
    let formdata = new FormData(this);
    let updatedUser = {};
    for (let [key, value] of formdata) {
      updatedUser[key] = value;
    }
    const url = `http://localhost:3000/api/users/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    };
    fetch(url, options)
      .then((res) => {
        alert("Data updated successfully.");
      })
      .catch((err) => {
        alert(err.message);
      });
  });
}

if (window.location.pathname === "/") {
  document.querySelectorAll("a.delete").forEach((link) =>
    link.addEventListener("click", function (e) {
      const id = link.getAttribute("data-id");
      const url = `http://localhost:3000/api/users/${id}`;
      const options = {
        method: "DELETE",
      };
      if (confirm("Do you want to delete this user?")) {
        fetch(url, options)
          .then((res) => {
            alert("Data successfully deleted.");
            location.reload();
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    })
  );
}
