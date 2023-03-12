import {
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link as MuiLink,
  Alert,
  Stack,
  Pagination,
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { buscarCarreras, limpiarCarrera, eliminarCarreraPorId } from '../../slices/carrerasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BuscarCarreras from './components/BuscarCarreras';
import { TableDeleteBtn, TableEditBtn, TableShowBtn } from '../../components/table/TableButtons';
import ConfirmationModalCarrera from '../../components/modals/ConfirmationModalCarrera';

const CarerrasPage = () => {

  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const carreraId = useRef<string>();
  const { cargando, carreras, mensajeError, cantidadPaginas, offset, limit } = useAppSelector(state => state.carrera);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarCarreras());

    return () => {
      if (!window.location.pathname.startsWith("/carreras")) {
        dispatch(limpiarCarrera());
      }
    }
  }, []);

  const handlePaginationOnChange = (ev: ChangeEvent<unknown>, offset: number) => {
    dispatch(buscarCarreras({ offset, limit }));
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>

      <Typography variant="h3">Listando Carreras</Typography>

      <Button
        variant="contained"
        size="small"
        onClick={() => navigate('/carrera/nueva')}
        fullWidth
      >
        Nueva Carrera
      </Button>


      <BuscarCarreras />

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
                    <TableCell align="center">Duracion</TableCell>
                    <TableCell align="center">Horario</TableCell>
                    <TableCell align="center">Plan</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carreras.map((carrera) => (
                    <TableRow
                      key={carrera._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {carrera.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {carrera.duracion}
                      </TableCell>
                      <TableCell align="center">
                        {carrera.horario}
                      </TableCell>
                      <TableCell align="center">
                        {carrera.plan}
                      </TableCell>
                      <TableCell align="right">
                        <TableShowBtn onClick={() => navigate(`/carreras/${carrera._id}/ver`)} />
                        <TableEditBtn onClick={() => navigate(`/carreras/${carrera._id}/editar`)} />
                        <TableDeleteBtn onClick={() => {
                          carreraId.current = carrera._id;
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

      <ConfirmationModalCarrera
        open={mostrarDialogo}
        message="Está seguro que desea eliminar la carrera seleccionada."
        onClose={() => setMostrarDialogo(false)}
        onNo={() => setMostrarDialogo(false)}
        onYes={() => {
          dispatch(eliminarCarreraPorId(carreraId.current || ''));
          setMostrarDialogo(false);
        }}
      />
    </Box>
  )
}

export default CarerrasPage