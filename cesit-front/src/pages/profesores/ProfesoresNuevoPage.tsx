import { Box, Typography } from '@mui/material';
import { crearProfesorService } from '../../services/profesores-services';
import FormProfesor, { IFormInputs } from './FormProfesor';
import { useNavigate } from 'react-router-dom';

const ProfesoresNuevoPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: IFormInputs) => {
    try {
      await crearProfesorService(data);
      navigate('/profesores');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <Typography variant="h3">Nuevo Profesor</Typography>
      <FormProfesor onSubmit={onSubmit} />
    </Box>
  );
};

export default ProfesoresNuevoPage;