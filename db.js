const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)

const todoSchema= mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean

})

const Todo = mongoose.model("Todo", todoSchema)

module.exports={
    Todo
}