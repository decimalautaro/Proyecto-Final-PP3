import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppContainer from '../components/AppContainer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </Box>
  );
};

export default PublicLayout;
