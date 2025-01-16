import { Schema, model } from "mongoose"

const taskCollection = 'Task'

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
},
    {
        timestamps: true,
    }
)

taskSchema.pre('findOne', function () {
    this.populate('user')
})

// taskSchema.pre('find', function () {
//     this.populate('user')
// })

export const taskModel = model(taskCollection, taskSchema)