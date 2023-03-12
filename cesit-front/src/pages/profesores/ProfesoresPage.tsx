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
import { useNavigate } from 'react-router-dom';
import {
  buscarProfesores,
  eliminarProfesorPorId,
  limpiarProfesores,
} from '../../slices/profesoresSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BuscarProfesores from './components/BuscarProfesores';
import { TableDeleteBtn, TableEditBtn, TableShowBtn } from '../../components/table/TableButtons';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { format } from 'date-fns'
import { DATE_FORMAT } from '../../utils/constants';

const ProfesoresPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const profesorId = useRef<string>();
  const { cargando, profesores, mensajeError, cantidadPaginas, offset, limit } = useAppSelector(
    (state) => state.profesor
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarProfesores());

    return () => {
      if (!window.location.pathname.startsWith('/profesores')) {
        dispatch(limpiarProfesores());
      }
    };
  }, []);

  const handlePaginationOnChange = (ev: ChangeEvent<unknown>, offset: number) => {
    dispatch(buscarProfesores({ offset, limit }));
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>

      <Typography variant="h3">Listando Profesores</Typography>

      <Button
        variant="contained"
        size="small"
        onClick={() => navigate('/profesores/nuevo')}
        fullWidth
      >
        Nuevo Profesor
      </Button>


      <BuscarProfesores />

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
                    <TableCell align="center">Fecha de Nacimiento</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {profesores.map((profesor) => (
                    <TableRow
                      key={profesor._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {profesor.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {profesor.apellido}
                      </TableCell>
                      <TableCell align="center">
                        {profesor.dni}
                      </TableCell>
                      <TableCell align="center">
                        {profesor.fechaNacimiento ? format(new Date(profesor.fechaNacimiento), DATE_FORMAT) : ''}
                      </TableCell>
                      <TableCell align="right">
                        <TableShowBtn onClick={() => navigate(`/profesores/${profesor._id}/ver`)} />
                        <TableEditBtn onClick={() => navigate(`/profesores/${profesor._id}/editar`)} />
                        <TableDeleteBtn onClick={() => {
                          profesorId.current = profesor._id;
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
        message="Está seguro que desea eliminar al profesor seleccionado."
        onClose={() => setMostrarDialogo(false)}
        onNo={() => setMostrarDialogo(false)}
        onYes={() => {
          dispatch(eliminarProfesorPorId(profesorId.current || ''));
          setMostrarDialogo(false);
        }}
      />
    </Box>
  );
};

export default ProfesoresPage;

