import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const SwapiForm = () => {
  return (
    <Box display="flex" justifyContent="center">
    <Paper
        elevation={3}
        sx={{
        p: 3,
        mt: 3,
        backgroundColor: '#f5f5f5',
        width: '100%',
        maxWidth: 600,
        }}
    >
        <form>
        <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">https://www.swapi.tech/api/</Typography>
            <TextField
            variant="outlined"
            size="small"
            placeholder="vehicle/19"
            sx={{ flexGrow: 1, backgroundColor: '#ffffffff' }}
            />
            <Button variant="contained" color="primary">
            Search
            </Button>
        </Box>
        </form>
            <Typography
            variant="body1"
            sx={{
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                backgroundColor: '#f0f0f0',
                p: 2,
                borderRadius: 1,
            }}
            >
            {`[
            {
                "name": "Luke Skywalker",
                "height": "172",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
                "homeworld": "https://swapi.info/api/planets/1",
                "films": [
                "https://swapi.info/api/films/1",
                "https://swapi.info/api/films/2",
                "https://swapi.info/api/films/3",
                "https://swapi.info/api/films/6"
                ]
            }
            ]`}
            </Typography>

    </Paper>
    </Box>

  );
};

export default SwapiForm;
