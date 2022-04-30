const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

//creating reactions as a subdocument schema for thoughts
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, 'Maximum of 180 characters']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal => dateFormat(createdAtVal))
    }
},
{
    toJSON: {
        getter: true
    }
})

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
    reactions: [ReactionSchema] 
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