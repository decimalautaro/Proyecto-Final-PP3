import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarAlumnoService } from '../../services/alumnos-services';
import { buscarAlumnoPorId } from '../../slices/alumnosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FormAlumno, { IFormInputs } from './FormAlumno';

const AlumnoEditarPage = () => {
  const { id } = useParams();
  const { cargando, alumnoSeleccionado } = useAppSelector(
    (state) => state.alumno
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(buscarAlumnoPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!alumnoSeleccionado) {
    return <div>Alumno no econtrado</div>;
  }

  const actualizandoAlumno = async (data: IFormInputs) => {
    try {
      if (!id) return;
      await actualizarAlumnoService(id, data);
      navigate(`/alumnos/${id}/ver`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <Typography variant="h3">Editar Alumno</Typography>
      <FormAlumno data={alumnoSeleccionado} onSubmit={actualizandoAlumno} />
    </Box>
  );
};

export default AlumnoEditarPage;
