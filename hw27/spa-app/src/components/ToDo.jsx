import React, { useState, useContext, useRef } from "react";
import { ThemeContext } from "../themeContext";

const ToDo = () => {
  const { currentTheme } = useContext(ThemeContext)
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTask = localStorage.getItem("tasks")
    return savedTask ? JSON.parse(savedTask) : [];
  })

  const idCounter = useRef(0)
  const generateId = () => {
    const newId = idCounter.current;
    idCounter.current += 1
    return newId
  };

  const handleAdd = () => {
    if (!inputValue) return;

    const newTask = { id: generateId(), text: inputValue }
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setInputValue("")
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  };

  return (
    <div
      className="todo_main_container"
      style={{
        background: currentTheme.background,
        color: currentTheme.color,
      }}
    >
      <div className="input_container">
        <input
          type="text"
          placeholder="enter text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}/>
        <button className="btn_add" onClick={handleAdd}>Add </button>
      </div>

      {tasks.map((task) => (
        <div className="todo-container" key={task.id}>
          <span className="task">{task.text}</span>
          <button className="delete_btn" onClick={() => handleDelete(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToDo;
