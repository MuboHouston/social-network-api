const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, 'Minimum of 1 character'],
        maxlength: [280, 'Maximum of 280 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal => dateFormat(createdAtVal))
    },
    reactions: [reactionSchema] 
},
    {
        toJSON: {
            virtuals: true,
            getter: true
        },
        id: false
    }
)

//get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

//create the User model using the UserSchema
const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;