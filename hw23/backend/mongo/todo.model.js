const { Schema, model} = require('mongoose')

const ToDoSchema = Schema ({
    text: {
        type: String,
        require: true,
    },
    done:{
        type: Boolean,
        require: true,
    }
})

module.exports = model('Todos', ToDoSchema)