import React from 'react';
import { Box, Typography, Link, List, ListItem } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        py: 3,
        px: 2,
        textAlign: 'center',
        mt: 20
      }}
    >
      <Typography variant="h6" gutterBottom>
        My Contacts
      </Typography>
      <List sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', p: 0 }}>
        <ListItem sx={{ p: 0.5 }}>
          <Link href="/" underline="hover">
            myname@gmail.com
          </Link>
        </ListItem>
        <ListItem sx={{ p: 0.5 }}>
          <Link href="tel:+380991234567" underline="hover">
            +38 (099) 999-99-99
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Footer;
