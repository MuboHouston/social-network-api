const { User, Thought } = require('../models')

//thought controller
const thoughtController = {
    //get thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => {
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    //get a thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.json({message: 'No thought found with this id'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    //create a new thought
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            )
            .populate({
                path: 'thoughts',
                select: '-__v', 
            })
            .select('-__v')
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No user found with that id!'})
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    //update an existing thought
    updateThought({ params, body}, res) {
        Thought.findByIdAndUpdate({
            _id: params.id
        },
        body,
        {new: true, runValidators: true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },

    //delete a thought
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({
            _id: params.id
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.json({message: 'No thought found with that id'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json({
            message: 'delete successful',
            data: err
        }))
    },

    //add a reaction to a thought
    addReaction({ params, body }, res) {
        console.log('body', body)
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbReactionData => {
                if(!dbReactionData) {
                    res.json({
                        message: 'No thoughts with this id!'
                    })
                    res.status(404).json(dbReactionData)
                }
            res.json(dbReactionData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },

    //remove reaction
    removeReaction({params}, res) {
        console.log(params, 'params')
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController