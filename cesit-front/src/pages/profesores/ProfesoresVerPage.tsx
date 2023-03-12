import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomLabelItem from '../../components/CustomLabelItem';
import { buscarProfesorPorId } from '../../slices/profesoresSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import format from 'date-fns/format';
import { DATE_FORMAT } from '../../utils/constants';

const ProfesoresVerPage: FC = () => {
  const { id } = useParams();
  const { cargando, profesorSeleccionado } = useAppSelector((state) => state.profesor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(buscarProfesorPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!profesorSeleccionado) {
    return <div>Profesor no encontrado</div>;
  }

  return (
    <Box>
      <Typography variant="h3">Visualizando Profesor</Typography>
      <Box padding={2}>
        <Link to="/profesores">Volver</Link>
      </Box>

      <Grid container spacing={2}>
        <CustomLabelItem label="Nombre" value={profesorSeleccionado.nombre} />
        <CustomLabelItem label="Apellido" value={profesorSeleccionado.apellido} />
        <CustomLabelItem label="DNI" value={profesorSeleccionado.dni} />
        <CustomLabelItem label="Fecha de Nacimiento" value={profesorSeleccionado.fechaNacimiento ? format(new Date(profesorSeleccionado.fechaNacimiento), DATE_FORMAT): ''} />
      </Grid>
    </Box>
  );
};
export default ProfesoresVerPage;