import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarCarreraService } from '../../services/carreras-services';

import { buscarCarreraPorId } from '../../slices/carrerasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FormCarrera, { IFormInputs } from './FormCarrera';

const CarrerasEditarPage = () => {
  const { id } = useParams();
  const { cargando, carreraSeleccionada } = useAppSelector((state) => state.carrera);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(buscarCarreraPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!carreraSeleccionada) {
    return <div>Carrera no econtrada</div>;
  }

  const actualizandoCarrera = async (data: IFormInputs) => {
    try {
      if (!id) return;
      await actualizarCarreraService(id, data);
      navigate('/carreras');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Editar Carrera</Typography>
      <FormCarrera data={carreraSeleccionada} onSubmit={actualizandoCarrera} />
    </Box>
  );
};

export default CarrerasEditarPage;
