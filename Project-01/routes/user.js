const express = require('express');

const router = express.Router();

const {handleGetAllUsers, getUserById, handleUpdateUser,handleDeleteUser,handleCreateNewUser } = require('../controllers/user');


// ROUTES

// REST API
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);
router
  .route("/:id")
  .get(getUserById)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);



module.exports = router;