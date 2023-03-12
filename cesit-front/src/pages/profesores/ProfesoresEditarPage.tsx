import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarProfesorService } from '../../services/profesores-services';
import { buscarProfesorPorId } from '../../slices/profesoresSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FormProfesor, { IFormInputs } from './FormProfesor';

const ProfesoresEditarPage = () => {
  const { id } = useParams();
  const { cargando, profesorSeleccionado } = useAppSelector(
    (state) => state.profesor
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(buscarProfesorPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!profesorSeleccionado) {
    return <div>Profesor no encontrado</div>;
  }

  const actualizandoProfesor = async (data: IFormInputs) => {
    try {
      if (!id) return;
      await actualizarProfesorService(id, data);
      navigate('/profesores');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Editar Profesor</Typography>
      <FormProfesor
        data={profesorSeleccionado}
        onSubmit={actualizandoProfesor}
      />
    </Box>
  );
};

export default ProfesoresEditarPage;
