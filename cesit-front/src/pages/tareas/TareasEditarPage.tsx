import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarTareaService } from '../../services/tareas-services';
import { buscarTareaPorId } from '../../slices/tareasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FormTarea, { IFormInputs } from './FormTarea';

const TareasEditarPage = () => {
  const { id } = useParams();
  const { cargando, tareaSeleccionada } = useAppSelector((state) => state.tarea);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(buscarTareaPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!tareaSeleccionada) {
    return <div>Tarea no econtrada</div>;
  }

  const actualizandoTarea = async (data: IFormInputs) => {
    try {
      if (!id) return;
      await actualizarTareaService(id, data);
      navigate('/tareas');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <Typography variant="h3">Editar Tarea</Typography>
      <FormTarea data={tareaSeleccionada} onSubmit={actualizandoTarea} />
    </Box>
  );
};

export default TareasEditarPage;
