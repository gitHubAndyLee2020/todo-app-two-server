import mongoose from 'mongoose'

const todoSchema = mongoose.Schema({
    text: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const TodoMessage = mongoose.model('TodoMessage', todoSchema)

export default TodoMessage