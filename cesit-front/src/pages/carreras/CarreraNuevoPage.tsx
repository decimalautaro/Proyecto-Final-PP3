import { Box, Typography } from '@mui/material';
import FormCarrera, { IFormInputs } from './FormCarrera';
import { crearCarreraService } from '../../services/carreras-services';
import { useNavigate } from 'react-router-dom';

const CarreraNuevoPage = () => {
  const navigate = useNavigate();
  const onSubmit = async (data: IFormInputs) => {
    try {
      await crearCarreraService(data);
      navigate('/carreras');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Nueva Carrera</Typography>
      <FormCarrera onSubmit={onSubmit} />
    </Box>
  );
};

export default CarreraNuevoPage;
