import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LeftMenu from '../components/LeftMenu';
import TopBar from '../components/TopBar';
import AppContainer from '../components/AppContainer';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar open={open} toggleDrawer={toggleDrawer} />
      <LeftMenu open={open} toggleDrawer={toggleDrawer} />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </Box>
  );
};

export default PrivateLayout;
