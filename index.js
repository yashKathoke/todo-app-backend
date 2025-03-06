const express = require("express")
const { createTodo, updateTodo } = require("./types")
const { Todo } = require("./db")
const app = express()

app.use(express.json())

app.post("/add-todo", async function (req, res) {
    const payload = req.body
    
    const validPayload = createTodo.safeParse(payload)

    if (!validPayload.success) {
        res.status(411).json({
            msg: "you sent invalid inputs"
        })
        return
    }

    //add to mongoDB
    await Todo.create({
        title: payload.title,
        description: payload.description,
        completed: false
    })

    res.json({
        msg: "todo added"
    })
})

app.get("/getTodos",async function (req, res){
    const todos = await Todo.find({})
    res.json({
        todos: todos
    })
})

app.put("/complete", function (req, res) {
    const payload = req.body;
    const validPayload = updateTodo.safeParse(payload)
    if (!validPayload.success) {
        res.status(411).json({
            msg: "You sent invalid inputs"
        })
        return;
    }

    //update in mongoDB
    Todo.updateOne({
        _id : payload.id
    },{
        completed: true
    })
})

app.listen(3000, function () {
    console.log("Server listening at http://localhost:3000");
    
})