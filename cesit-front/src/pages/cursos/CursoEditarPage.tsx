import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarCursoService } from '../../services/cursos-services';

import { buscarCursoPorId } from '../../slices/cursosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FormCurso, { IFormInputs } from './FormCurso';

const CursoEditarPage = () => {
  const { id } = useParams();
  const { cargando, cursoSeleccionado } = useAppSelector((state) => state.curso);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(buscarCursoPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!cursoSeleccionado) {
    return <div>Curso no econtrado</div>;
  }

  const actualizandoCurso = async (data: IFormInputs) => {
    try {
      if (!id) return;
      await actualizarCursoService(id, data);
      navigate('/cursos');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Editar Curso</Typography>
      <FormCurso data={cursoSeleccionado} onSubmit={actualizandoCurso} />
    </Box>
  );
};

export default CursoEditarPage;
