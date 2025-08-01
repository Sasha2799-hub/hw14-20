import './App.css';
import ToDoForm from './components/ToDoForm';
import AddedTasks from './components/AddedTasks';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="container">
      <h2>My ToDo List</h2>
      <ToDoForm />
      <AddedTasks />
    </div>
  )
}

export default App;