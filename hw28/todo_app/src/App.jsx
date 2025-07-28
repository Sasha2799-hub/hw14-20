import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  return (
    <div className="todo-container">
      <h2>ToDo List</h2>
      <Formik
      initialValues= {{task:""}}
      validate={(values) => {
        const errors = {};
        if (!values.task) {
          errors.task = "You have to write smth first"
        } else if (values.task.length < 5) {
          errors.task = "Min 5 symbols"
        }
        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
          setTasks([...tasks, values.task])
          resetForm()
        
  
      }}
      >
        <Form>
            <div className="input-box">
              <Field type="text" name="task" placeholder="Enter a task" />
              <ErrorMessage name="task" component="div" className="error" />
            </div>
            <button className="btn_add" type="submit">Add</button>
        </Form>
      </Formik>
        <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
