const { User } = require('../models')

// handle errors
const errorHandler = (err) => {
    let errors = { duplicate: '', email: '' };

    // validation error
    if (err.message.includes('is not a valid email')) {
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(properties)
            errors[properties.path] = properties.message;
      })
    }

    // duplicate username/email error
    if (err.code === 11000) {
        errors.duplicate = 'This username and/or email is already used';
    }

    return errors;
}

//user controllers
const userController = {
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            // console.log(err);
            res.status(400).json(err)
        })
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        // .populate({
        //     path: "thoughts",
        //     select: '-__v'
        // },
        // {
        //     path: "friends",
        //     select: '-__v'
        // })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this id!'})
                return;
            } 
            res.json(dbUserData)
        })
        .catch(err => {
            // console.log(err);
            res.status(400).json(err)
        });
    },

    createUser({ body }, res) {
        // console.log('user body', body)
        User.create(body)
        .then(dbUserData => {
            // console.log('data:', dbUserData)
            res.json(dbUserData)
        })
        .catch(err => {
            const errors = errorHandler(err);
            res.status(400).json(errors)
        })
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err =>{
            const errors = errorHandler(err);
            res.status(400).json(errors)
        })
    },

    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id})
        .then(dbUserData =>{
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'})
                return;
            }
            res.json({
                message: 'deleted',
                data: dbUserData})
        })
        .catch(err => res.status(400).json(err))
    }
}

module.exports = userController