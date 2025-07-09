const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const ToDoModel = require('./mongo/todo.model')

const connect = mongoose.connect('mongodb+srv://alex0kuz99:xl7a3ULYJqGfG4LT@cluster0.xrhblnm.mongodb.net/todo-app?retryWrites=true&w=majority');

connect.then(() => console.log('connected'));

app.use(cors());
app.use(express.json());

app.listen(8080, () => {
  console.log('сервер працює на порті 8080');
})

app.get('/', (req, res) => {
  res.send('Hello from clean setup!')
})

app.get('/todos', (req, res) => {

  ToDoModel.find().then(response => res.send(response));
})

app.post('/todos/', (req, res) => {
  const todo = new ToDoModel(req.body)
  todo.save().then(response => res.send(response))
})

app.put('/todos/:id', (req, res) => {
  const id = req.params.id

  ToDoModel.updateOne({_id: id}, req.body)
  .then(() => ToDoModel.findById(id))
  .then(response => res.send(response))
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id

  ToDoModel.deleteOne({_id: id})
  .then(response =>{
    if(response.deletedCount === 0){
      res.status(404).send({message: "Todo weren't found"})
    }else {
      res.send(response)
    }
  })
})
