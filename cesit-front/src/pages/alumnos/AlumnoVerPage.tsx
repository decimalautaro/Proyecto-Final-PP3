import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import { format } from 'date-fns';
import { FC, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CustomLabelItem from '../../components/CustomLabelItem';
import { TableEditBtn } from '../../components/table/TableButtons';
import { buscarAlumnoPorId } from '../../slices/alumnosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DATE_FORMAT } from '../../utils/constants';

const AlumnoVerPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cargando, alumnoSeleccionado } = useAppSelector(
    (state) => state.alumno
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(buscarAlumnoPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <LinearProgress />;
  }
  if (!alumnoSeleccionado) {
    return <div>Alumno no econtrado</div>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <Typography variant="h3">Visualizando Alumno</Typography>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Link to="/alumnos">Volver</Link>
        </Grid>
        <Grid item xs={4}>
          <TableEditBtn onClick={() => navigate(`/alumnos/${alumnoSeleccionado._id}/editar`)} />
        </Grid>
      </Grid>


      <Grid container spacing={2}>
        <CustomLabelItem label="Nombre" value={alumnoSeleccionado.nombre} />
        <CustomLabelItem
          label="Descripcion"
          value={alumnoSeleccionado.apellido}
        />
        <CustomLabelItem label="DNI" value={alumnoSeleccionado.dni} />
        {
          alumnoSeleccionado.domicilio.map((alumno) => {
            return (
              <CustomLabelItem
                label={`Domicilio ${alumnoSeleccionado.domicilio.indexOf(alumno) + 1}`}
                value={`${alumno.calle} ${alumno.numero} ${alumno.localidad} ${alumno.provincia} (${(alumno.referencia) ? alumno.referencia : 'sin referencia'})`}
              />
            );

          })
        }
        <CustomLabelItem
          label="Fecha de nacimiento"
          value={alumnoSeleccionado.fechaNacimiento ? format(new Date(alumnoSeleccionado.fechaNacimiento), DATE_FORMAT) : ''}
        />
      </Grid>
    </Box>
  );
};

export default AlumnoVerPage;
