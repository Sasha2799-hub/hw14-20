import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchProducts,
  openModalToEdit,
  openModalToDelete,
} from "../../redux/slice/rozetkaSlice";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ModalAddProducts from "../Modals/ModalAddProduct";
import ModalDeleteProduct from "../Modals/ModalDeleteProduct";
import { useNavigate } from "react-router-dom";

const ProductsTabel = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEditProduct = (product) => {
    dispatch(openModalToEdit(product));
  };

  const navigation = useNavigate();
  const goToPreviewPage = () => {
    navigation("/display");
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        pr: 5,
        pl: 5,
        mt: 10,
        backgroundColor: "rgba(255, 255, 255, 1)",
      }}
    >
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: 15,
          left: 25,
          width: "20ch",
          backgroundColor: "#44B26F",
          color: "#ffffff",
          fontWeight: 500,
        }}
        onClick={() => goToPreviewPage()}
      >
        Preview
      </Button>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: 15,
          right: 25,
          width: "20ch",
          backgroundColor: "#44B26F",
          color: "#ffffff",
          fontWeight: 500,
        }}
        onClick={() => handleEditProduct()}
      >
        Add Product
      </Button>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          color: "#44B26F",
          textAlign: "center",
          mb: 10,
          pt: 10,
        }}
      >
        Products
      </Typography>

      <Box sx={{ p: 2 }}>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "rgba(243, 240, 240, 1)",
            maxHeight: 400,
            overflowY: "auto",
            height: 400,
          }}
        >
          <Table stickyHeader aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price(₴)</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(items) &&
                items.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell>
                      <IconButton
                        color="black"
                        onClick={() => handleEditProduct(product)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="black"
                        onClick={() => dispatch(openModalToDelete(product))}
                      >
                        <RestoreFromTrashIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ModalAddProducts />
      <ModalDeleteProduct />
    </Box>
  );
};

export default ProductsTabel;
