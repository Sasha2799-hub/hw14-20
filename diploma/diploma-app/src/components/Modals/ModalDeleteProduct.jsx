import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  requestDeleteProduct,
} from "../../redux/slice/rozetkaSlice";

const ModalDeleteProduct = () => {
  const { isModalDeleteOpen, productToDelete } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (productToDelete) {
      dispatch(requestDeleteProduct(productToDelete));
    }
  };

  return (
    <Modal
      keepMounted
      open={isModalDeleteOpen}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
          width: 400,
        }}
      >
        <Typography id="delete-modal-title" variant="h6" component="h2">
          Are you sure you want to delete this product?
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
        >
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDeleteProduct;
