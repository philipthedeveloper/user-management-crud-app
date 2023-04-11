const router = require("express").Router();
const services = require("../services/render");
const {
  createNewUser,
  findUsers,
  updateUser,
  deleteUser,
} = require("../controllers/controller");

/**
 * @description Route Route
 * @method GET
 */
router.get("/", services.homeRoutes);

/**
 * @description add user
 * @method GET /add-user
 */
router.get("/add-user", services.add_user);

/**
 * @description update user
 * @method GET /update-user
 */
router.get("/update-user", services.update_user);

/**
 * @description creat a new user
 * @method POST
 */
router.post("/api/users", createNewUser);

/**
 * @description get all users/ one user
 * @method GET
 */
router.get("/api/users", findUsers);

/**
 * @description update a specifi user
 * @method PUT
 */
router.put("/api/users/:id", updateUser);

/**
 * @description creat a new user
 * @method DELETE
 */
router.delete("/api/users/:id", deleteUser);

module.exports = router;
