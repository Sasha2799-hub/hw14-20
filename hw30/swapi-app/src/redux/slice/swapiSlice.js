import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: false,
};

export const swapi = createSlice({
  name: "swapi",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.items = [action.payload]
      state.isLoading = false
    },
    clearItems: (state) => {
      state.items = []
    }
  },
});

export const { fetchStart, fetchSuccess, clearItems } = swapi.actions

export const fetchSwapiData = (endpoint) => async (dispatch) => {
  if (!endpoint || endpoint.trim() === '') {
    console.log('Empty');
    return;
  }
  dispatch(fetchStart());

  try {
    const response = await fetch(`https://www.swapi.tech/api/${endpoint.trim()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    dispatch(fetchSuccess(data))
  } catch (error) {
    console.error("Fetch error:", error)
  }
};

export default swapi.reducer
