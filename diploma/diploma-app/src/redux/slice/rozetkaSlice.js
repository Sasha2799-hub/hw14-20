import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem("products")) || [],
  isLoading: false,
  isModalEditOpen: false,
  isModalDeleteOpen: false,
  editedProduct: null,
  productToDelete: null,
  error: null,
};

const rozetkaSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state) => { state.isLoading = true; },
    openModalToEdit: (state, action) => {
      state.isModalEditOpen = true;
      state.editedProduct = action.payload;
    },
    closeModal: (state) => {
      state.isModalEditOpen = false;
      state.isModalDeleteOpen = false;   
      state.editedProduct = null;
      state.productToDelete = null;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    updateProduct: (state, action) => {
      state.items = state.items.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    openModalToDelete: (state, action) => {
      state.isModalDeleteOpen = true;
      state.productToDelete = action.payload; 
    },
    setProducts: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
      state.isLoading = false;
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    deleteProduct: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
      localStorage.setItem("products", JSON.stringify(state.items));
      state.isModalDeleteOpen = false;
      state.productToDelete = null;
    },
    requestAddProduct: (state, action) => {},
    requestUpdateProduct: (state, action) => {},
    requestDeleteProduct: (state, action) => {},  
  },
});

export const {
  fetchProducts,
  setProducts,
  openModalToEdit,
  closeModal,
  addProduct,
  updateProduct,
  setError,
  requestAddProduct,
  requestUpdateProduct,
  openModalToDelete,
  deleteProduct,
  requestDeleteProduct  
} = rozetkaSlice.actions;

export default rozetkaSlice.reducer;
