const router = require('express').Router();
const {getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction} = require('../../controllers/thought-controller')

router 
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:userId')
    .post(createThought)

router
    .route('/:thoughtId/reactions')
    .put(addReaction)

module.exports = router;