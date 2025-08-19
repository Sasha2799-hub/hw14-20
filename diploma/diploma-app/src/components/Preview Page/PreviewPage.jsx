import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const PreviewPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://689c80e658a27b18087e70f8.mockapi.io/products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                width: 300,
                height: 400,
                margin: "auto",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {product.photo && product.photo.startsWith("http") ? (
                <Box sx={{ p: 1 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.photo}
                    alt={product.name}
                    sx={{
                      objectFit: "cover",
                      borderRadius: "12px",
                      width: "100%",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 200,
                    backgroundColor: "#f0f0f0",
                    borderRadius: "12px",
                    m: 1,
                  }}
                />
              )}
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="body1">{product.price}₴</Typography>
                  <Typography variant="body2">x{product.quantity}</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Typography variant="body2" color="green">
                    Ready to deliver
                  </Typography>
                  <IconButton color="primary">
                    <ShoppingCartIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PreviewPage;
