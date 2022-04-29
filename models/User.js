const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        //Validate takes in a function with a parameter of the value entered by user for email
        validate: [(val) => {
            var emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            return emailRegex.test(val)
        }, 'Please enter a valid email']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
},
{
    toJSON: {
        virtuals: true
    }
})

//get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

//create the User model using the UserSchema
const User = model('User', UserSchema)

module.exports = User;