import { useDispatch } from 'react-redux';
import { addToDo } from '../redux/slice/todoSlice'
import { useState } from 'react';

const ToDoForm = () => {
    const [task, setTask] = useState("")
    const dispatch = useDispatch();

    const handleSubmit =(event) => {
        event.preventDefault()
        if(task.trim() === "") return
        dispatch(addToDo(task))
        setTask("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter new task"
            />
            <button type="submit">Add</button>
        </form>

    )   

}

export default ToDoForm
