const { Schema, model, Types } = require('mongoose');
const { isEmail } = require('validator')

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
        validate: {
            validator: isEmail, 
            message: '{VALUE} is not a valid email'
        }
    },
    thoughts: [
        {
            type: Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
},
{
    toJSON: {
        virtuals: true,
    }, 
    id: false
})

//get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

//create the User model using the UserSchema
const User = model('User', UserSchema)

UserSchema.post('remove', function(doc) {
    console.log(doc)
    User.remove({ user: doc._id }).exec
})

module.exports = User;