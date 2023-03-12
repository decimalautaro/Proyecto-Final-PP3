import { Box, Typography } from '@mui/material';
import { crearTareaService } from '../../services/tareas-services';
import FormTarea, { IFormInputs } from './FormTarea';
import { useNavigate } from 'react-router-dom';

const TareasNuevaPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: IFormInputs) => {
    try {
      await crearTareaService(data);
      navigate('/tareas');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <Typography variant="h3">Nueva Tarea</Typography>
      <FormTarea onSubmit={onSubmit} />
    </Box>
  );
};

export default TareasNuevaPage;
