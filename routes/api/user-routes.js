const router = require('express').Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../../controllers/user-controller');

router
    .route('/')
    .post(createUser)
    .get(getAllUsers)

router
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser)

module.exports = router