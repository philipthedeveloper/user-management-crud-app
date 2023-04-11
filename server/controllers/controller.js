const Userdb = require("../models/model");

const createNewUser = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Please provide all the required information." });
  }

  const newuser = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  newuser
    .save(newuser)
    .then((data) => {
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured while creating user.",
      });
    });
};

const findUsers = (req, res) => {
  const id = req.query.id;
  if (id) {
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Can't find user with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            `An Error occured while retrieving user with id ${id}`,
        });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occured while retrieving user information.",
        });
      });
  }
};

const updateUser = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Please provide all the required information." });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send(`Can't update user with id${id}`);
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured while updating user.",
      });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Can't delete user with id ${id}` });
      } else {
        res.send({ message: "User was delete Successfully.", data: data });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `An error occured while deleting user with id ${id}`,
      });
    });
};

module.exports = { createNewUser, findUsers, updateUser, deleteUser };
