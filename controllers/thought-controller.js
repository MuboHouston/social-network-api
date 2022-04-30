const { User, Thought } = require('../models')

const thoughtController = {
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

    getThoughtById({params}, res) {
        Thought.findById({_id: params.id})
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
    }
}

module.exports = thoughtController