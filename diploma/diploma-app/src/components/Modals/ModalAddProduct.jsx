import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import {
  closeModal,
  requestAddProduct,
  requestUpdateProduct,
} from "../../redux/slice/rozetkaSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";

const ModalAddProducts = () => {
  const { isModalEditOpen, editedProduct, items } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    const requiredFields = [
      "category",
      "name",
      "quantity",
      "price",
      "description",
      "photo",
    ];
    requiredFields.forEach((field) => {
      if (!values[field]) errors[field] = "Required";
    });
    return errors;
  };

  const initialValues = editedProduct || {
    category: "",
    name: "",
    quantity: "",
    price: "",
    photo: "",
    description: "",
  };

  const onSubmit = (values, form) => {
    if (editedProduct) {
      dispatch(requestUpdateProduct(values));
    } else {
      const newId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
      dispatch(requestAddProduct({ ...values, id: newId }));
    }
    form.reset();
    dispatch(closeModal());
  };
  return (
    <Modal
      open={isModalEditOpen}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography id="server-modal-title" variant="h6" component="h2">
          {editedProduct ? "Edit Product" : "Add Product"}
        </Typography>

        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={validate}
          render={({ handleSubmit, form, values }) => (
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              validate={validate}
              render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="category">
                    {({ input, meta }) => (
                      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Category</InputLabel>
                        <Input {...input} />
                        {meta.touched && meta.error && (
                          <Typography variant="caption" color="error">
                            {meta.error}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="name">
                    {({ input, meta }) => (
                      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Name</InputLabel>
                        <Input {...input} />
                        {meta.touched && meta.error && (
                          <Typography variant="caption" color="error">
                            {meta.error}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="quantity">
                    {({ input, meta }) => (
                      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Quantity</InputLabel>
                        <Input {...input} />
                        {meta.touched && meta.error && (
                          <Typography variant="caption" color="error">
                            {meta.error}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="price">
                    {({ input, meta }) => (
                      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Price</InputLabel>
                        <Input {...input} />
                        {meta.touched && meta.error && (
                          <Typography variant="caption" color="error">
                            {meta.error}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="photo">
                    {({ input, meta }) => (
                      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Photo</InputLabel>
                        <Input {...input} />
                        {meta.touched && meta.error && (
                          <Typography variant="caption" color="error">
                            {meta.error}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="description">
                    {({ input, meta }) => (
                      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                        <TextField
                          label="Description"
                          multiline
                          minRows={3}
                          maxRows={10}
                          variant="standard"
                          fullWidth
                          {...input}
                        />
                        {meta.touched && meta.error && (
                          <Typography variant="caption" color="error">
                            {meta.error}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  </Field>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Button type="submit" variant="contained" color="success">
                      Submit
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() => {
                        form.reset();
                        dispatch(closeModal());
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            />
          )}
        />
      </Box>
    </Modal>
  );
};

export default ModalAddProducts;
