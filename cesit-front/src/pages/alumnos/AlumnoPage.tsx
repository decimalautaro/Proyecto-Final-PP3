import {
  Alert,
  Button,
  LinearProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import {
  buscarAlumnos,
  eliminarAlumnoPorId,
  limpiarAlumnos,
} from '../../slices/alumnosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BuscarAlumnos from './components/BuscarAlumnos';
import { TableDeleteBtn, TableEditBtn, TableShowBtn } from '../../components/table/TableButtons';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { format } from 'date-fns'
import { DATE_FORMAT } from '../../utils/constants';

const AlumnoPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const alumnoId = useRef<string>();
  const { cargando, alumnos, mensajeError, cantidadPaginas, offset, limit } = useAppSelector(
    (state) => state.alumno
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarAlumnos());

    return () => {
      if (!window.location.pathname.startsWith('/alumnos')) {
        dispatch(limpiarAlumnos());
      }
    };
  }, []);
  const handlePaginationOnChange = (ev: ChangeEvent<unknown>, offset: number) => {
    dispatch(buscarAlumnos({ offset, limit }));
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <Typography variant="h3">Listando Alumnos</Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate('/alumnos/nuevo')}
      >
        Nuevo Alumno
      </Button>

      <BuscarAlumnos />

      {mensajeError && (
        <Box marginTop={2}>
          <Alert severity="error" color="error">
            {mensajeError}
          </Alert>
        </Box>
      )}
      
      {cargando ? (
        <Box marginTop={2}>
          <LinearProgress color="secondary" />
        </Box>
      ) : (
        !mensajeError && (
          <>
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Apellido</TableCell>
                  <TableCell align="center">DNI</TableCell>
                  <TableCell align="center">Direccion</TableCell>
                  <TableCell align="center">Fecha de nacimiento</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alumnos.map((alumno) => (
                  <TableRow
                    key={alumno._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {alumno.nombre}
                    </TableCell>
                    <TableCell align="center">{alumno.apellido}</TableCell>
                    <TableCell align="center">{alumno.dni}</TableCell>
                    <TableCell align="center">{alumno.domicilio}</TableCell>
                    <TableCell align="center">
                      {alumno.fechaNacimiento ? format(new Date(alumno.fechaNacimiento), DATE_FORMAT) : ''}
                    </TableCell>
                    <TableCell align="right">
                          <TableShowBtn onClick={() => navigate(`/alumnos/${alumno._id}/ver`)} />
                          <TableEditBtn onClick={() => navigate(`/alumnos/${alumno._id}/editar`)} />
                          <TableDeleteBtn onClick={() => {
                            alumnoId.current = alumno._id;
                            setMostrarDialogo(true);
                          }} />
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={2} width="100%" alignItems="center">
              <Pagination count={cantidadPaginas} page={offset} siblingCount={2} onChange={handlePaginationOnChange} variant="outlined" color="primary" />
            </Stack>
          </>
        )
      )}

<ConfirmationModal
        open={mostrarDialogo}
        message="Está seguro que desea eliminar la tarea seleccionada."
        onClose={() => setMostrarDialogo(false)}
        onNo={() => setMostrarDialogo(false)}
        onYes={() => {
          dispatch(eliminarAlumnoPorId(alumnoId.current || ''));
          setMostrarDialogo(false);
        }}
      />
    </Box>
  );
};

export default AlumnoPage;
