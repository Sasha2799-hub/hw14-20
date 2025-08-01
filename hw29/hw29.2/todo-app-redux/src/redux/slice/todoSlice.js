import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
}

export const todoList =createSlice({
    name:' todo',
    initialState,
    reducers : {
        addItems:(state, action) => {
            state.items.push(action.payload)
        }
    }
}) 

export const { addItems } = todoList.actions;
export default todoList.reducer;
