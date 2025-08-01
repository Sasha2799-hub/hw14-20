import './App.css';
import ToDoForm from './components/ToDoForm';
import AddedTasks from './components/AddedTasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="container">
      <h2>My ToDo List</h2>
      <ToDoForm />
      <AddedTasks />
      <Footer />
    </div>
  )
}

export default App;