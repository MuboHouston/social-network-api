const router = require('express').Router();
const {getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction} = require('../../controllers/thought-controller')

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
        

router
    .route('/:thoughtId/reactions/:reactionId')
    .put(removeReaction)

module.exports = router;