import { Box, Typography } from '@mui/material';
import { crearAlumnoService } from '../../services/alumnos-services';
import FormAlumno, { IFormInputs } from './FormAlumno';
import { useNavigate } from 'react-router-dom';

const AlumnoNuevaPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: IFormInputs) => {

    try {
      const alumno = await crearAlumnoService(data);
      navigate(`/alumnos/${alumno._id}/ver`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Nuevo Alumno</Typography>
      <FormAlumno onSubmit={onSubmit} />
    </Box>
  );
};

export default AlumnoNuevaPage;
