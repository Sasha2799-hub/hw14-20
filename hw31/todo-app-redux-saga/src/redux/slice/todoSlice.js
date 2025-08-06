import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

export const todoList = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    fetchItems: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setFetchedItems: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false;
    },
    addToDo: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addItems: (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
    },
    toggleCompleteRequest: (state, action) => {
    state.isLoading = true;
    state.error = null;
    },
    toggleCompleteSuccess: (state, action) => {
    const id = action.payload;
    const item = state.items.find(i => i.id === id);
    if (item) item.done = !item.done;
    state.isLoading = false;
    },

    editTodoRequest: (state, action) => {
      const { id, text } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) item.text = text
    },
    editTodoSuccess: (state, action) => {
    }
  }
});

export const {fetchItems, setFetchedItems, setError, addToDo, addItems, toggleCompleteRequest, toggleCompleteSuccess, editTodoRequest, editTodoSuccess} = todoList.actions;

export default todoList.reducer;
