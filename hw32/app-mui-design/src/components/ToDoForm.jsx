import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Stack,
} from "@mui/material";

const ToDoForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTask = localStorage.getItem("tasks");
    return savedTask ? JSON.parse(savedTask) : [];
  });

  const idCounter = useRef(0);
  const generateId = () => {
    const newId = idCounter.current;
    idCounter.current += 1;
    return newId;
  };

  const handleAdd = () => {
    if (!inputValue.trim()) return;

    const newTask = { id: generateId(), text: inputValue };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setInputValue("");
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    mt: 4,
    px: 2,
  }}
>
  <Paper
    elevation={3}
    sx={{
      p: 3,
      backgroundColor: '#f5f5f5',
      width: '100%',
      maxWidth: 600,
    }}
  >
    <Box display="flex" gap={2} mb={2}>
      <TextField
        fullWidth
        label="Enter task"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ backgroundColor: '#fff' }}
      />
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </Box>

    <Stack spacing={2}>
      {tasks.map((task) => (
        <Paper
          key={task.id}
          elevation={1}
          sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography>{task.text}</Typography>
          <Button color="error" onClick={() => handleDelete(task.id)}>
            Delete
          </Button>
        </Paper>
      ))}
    </Stack>
  </Paper>
</Box>
  );
};

export default ToDoForm;
