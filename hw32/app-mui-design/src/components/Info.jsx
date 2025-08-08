import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const InfoPage = () => (
  <Box sx={{ p: 4, display: 'flex', justifyContent: 'center',}}>
    <Paper elevation={3} square sx={{ p: 4, maxWidth: 600, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Skills
      </Typography>
      <Typography variant="body1">
        <strong>Languages & Tools:</strong> HTML5, CSS3, JavaScript (ES6+), Git, npm  
        <br />
        <strong>Frameworks & Libraries:</strong> React, Redux Toolkit, Redux Saga, Vite, Material UI, Bootstrap
      </Typography>

      <Typography variant="h5" gutterBottom>
        Languages
      </Typography>
      <Typography variant="body1">
        • English — B2 (Upper-Intermediate)  
        <br />
        • Ukrainian — Native  
        <br />
        • Russian — Fluent
      </Typography>
    </Paper>
  </Box>
);

export default InfoPage;
