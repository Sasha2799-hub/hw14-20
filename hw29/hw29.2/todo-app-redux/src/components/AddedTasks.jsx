import { useSelector } from 'react-redux';

const AddedTasks = () => {
  const addedTask = useSelector((state) => state.todo.items);

  return (
    <div className="task-list">
    {addedTask.map((item) => (
        <div className="task-item">{item}</div>
        ))}
    </div>
  )
}

export default AddedTasks;
