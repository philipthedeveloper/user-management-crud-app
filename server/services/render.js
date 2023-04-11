const axios = require("axios");

const homeRoutes = (req, res) => {
  axios
    .get("http://localhost:3000/api/users")
    .then((response) => {
      res.render("index", { user: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

const add_user = (req, res) => {
  res.render("add-user");
};

const update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then((response) => {
      res.render("update-user", { user: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { homeRoutes, add_user, update_user };
