import { Box, Typography } from '@mui/material'
import FormCurso, { IFormInputs } from './FormCurso'
import { crearCursoService } from '../../services/cursos-services';//cambiar
import { useNavigate } from 'react-router-dom';

const CursoNuevoPage = () => {
  const navigate = useNavigate();
  const onSubmit = async (data: IFormInputs) => {
    try {
      await crearCursoService(data);
      navigate('/cursos');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box>
      <Typography variant="h3">Nuevo Curso</Typography>
      <FormCurso onSubmit={onSubmit} />
    </Box>
  )
}

export default CursoNuevoPage  