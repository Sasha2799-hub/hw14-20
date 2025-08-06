import { useSelector, useDispatch } from 'react-redux';
import { toggleCompleteRequest, editTodoRequest } from '../redux/slice/todoSlice';
import { useState } from 'react';

const AddedTasks = () => {
  const addedTask = useSelector(state => state.todo.items);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleToggle = (id) => {
    dispatch(toggleCompleteRequest(id));
  };

  const handleEditStart = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditSave = (id) => {
    if (editText.trim() !== "") {
      dispatch(editTodoRequest({ id, text: editText }));
    }
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="task-list">
      {addedTask.map(item => (
        <div key={item.id} className="task-item">
          <input
            type="checkbox"
            checked={!!item.done}
            onChange={() => handleToggle(item.id)}
          />
          {editId === item.id ? (
            <>
              <input
                value={editText}
                onChange={e => setEditText(e.target.value)}
              />
              <button onClick={() => handleEditSave(item.id)}>Save</button>
              <button onClick={() => {
                setEditId(null);
                setEditText("");
              }}>Cancel</button>
            </>
          ) : (
            <>
              <div style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none' }}>
                {item.text}
              </div>
              <button onClick={() => handleEditStart(item.id, item.text)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddedTasks;
