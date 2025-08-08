import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Box } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{
        backgroundColor: '#f5f5f5',
        py: 3,
        px: 2,
        mt: 'auto',
        textAlign: 'center'
      }}>
      <nav className="header-links">
        <Button component={NavLink} to="/" color="inherit" sx={{ px: 3 }}>
          Main
        </Button>
        <Button component={NavLink} to="/todo" color="inherit" sx={{ px: 3 }}>
          ToDo List
        </Button>
        <Button component={NavLink} to="/swapi" color="inherit" sx={{ px: 3 }}>
          SWAPI
        </Button>
      </nav>
    </Box>
  );
};

export default Header;

