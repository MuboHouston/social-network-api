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
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            // console.log(err);
            res.status(400).json(err)
        })
    },

    //get a user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: "thoughts",
            select: '-__v'
        })
        .populate({
            path: "friends",
            select: '-__v'
        })
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

    //create a new user 
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

    //update an existing user
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

    //delete a user
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id})
        .then(dbUserData =>{
            console.log(dbUserData, "user")
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'})
                return;
            }
            res.json({
                message: 'delete successful',
                data: dbUserData})
        })
        .catch(err => res.status(400).json({err}))
    },

    //add a new friend
    addFriend({ params }, res) {    
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true, runValidators: true}
        )
        .then(dbFriendData => {
            if(!dbFriendData) {
                res.status(404).json({message: 'No user found with this id'})
                return;
            }
            res.json(dbFriendData);
        })
        .catch(err => res.json(err))
    },

    //remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbFriendData => {
            if(!dbFriendData) {
                res.status(404).json({message: 'No user found with this id'})
                return
            }
            res.json(dbFriendData)
        })
        .catch(err=> res.json(err))
    }
}

module.exports = userController