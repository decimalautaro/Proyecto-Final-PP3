import { Box, Grid, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomLabelItem from '../../components/CustomLabelItem';
import { buscarCarreraPorId } from '../../slices/carrerasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const CarrerasVerPage: FC = () => {
  const { id } = useParams();
  const { cargando, carreraSeleccionada } = useAppSelector((state) => state.carrera);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(buscarCarreraPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!carreraSeleccionada) {
    return <div>Carrera no econtrada</div>;
  }

  return (
    <Box>
      <Typography variant="h3">Visualizando Carrera</Typography>
      <Box padding={2}>
        <Link to="/carreras">Volver</Link>
      </Box>

      <Grid container spacing={2} color={blue}>
        <CustomLabelItem label="Nombre" value={carreraSeleccionada.nombre} />
        <CustomLabelItem label="Duracion" value={carreraSeleccionada.duracion} />
        <CustomLabelItem label="Horario" value={carreraSeleccionada.horario} />
        <CustomLabelItem label="Plan" value={carreraSeleccionada.plan} />
      </Grid>

    </Box>
  );
};

export default CarrerasVerPage;
