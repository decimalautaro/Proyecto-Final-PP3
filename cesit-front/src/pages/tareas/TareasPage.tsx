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
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  buscarTareas,
  eliminarTareaPorId,
  limpiarTareas,
} from '../../slices/tareasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BuscarTareas from './components/BuscarTareas';
import {
  TableDeleteBtn,
  TableEditBtn,
  TableShowBtn,
} from '../../components/table/TableButtons';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../utils/constants';
import TitulosApp from '../../components/TitulosApp';

const TareasPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const tareaId = useRef<string>();
  const { cargando, tareas, mensajeError, cantidadPaginas, offset, limit } =
    useAppSelector((state) => state.tarea);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarTareas());

    return () => {
      if (!window.location.pathname.startsWith('/tareas')) {
        dispatch(limpiarTareas());
      }
    };
  }, []);

  const handlePaginationOnChange = (
    ev: ChangeEvent<unknown>,
    offset: number
  ) => {
    dispatch(buscarTareas({ offset, limit }));
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <TitulosApp title="Listando Tareas">
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate('/tareas/nueva')}
          fullWidth
        >
          Nueva Tarea
        </Button>
      </TitulosApp>

      <BuscarTareas />

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
                    <TableCell align="center">Finalizada</TableCell>
                    <TableCell align="center">Fecha Límite</TableCell>
                    <TableCell align="center">Progreso</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tareas.map((tarea) => (
                    <TableRow
                      key={tarea._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {tarea.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {tarea.finalizada ? 'Si' : 'No'}
                      </TableCell>
                      <TableCell align="center">
                        {tarea.fechaLimite
                          ? format(new Date(tarea.fechaLimite), DATE_FORMAT)
                          : ''}
                      </TableCell>
                      <TableCell align="center">{tarea.progreso}</TableCell>
                      <TableCell align="right">
                        <TableShowBtn
                          onClick={() => navigate(`/tareas/${tarea._id}/ver`)}
                        />
                        <TableEditBtn
                          onClick={() => navigate(`/tareas/${tarea._id}/editar`)}
                        />
                        <TableDeleteBtn
                          onClick={() => {
                            tareaId.current = tarea._id;
                            setMostrarDialogo(true);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack spacing={2} width="100%" alignItems="center">
              <Pagination
                count={cantidadPaginas}
                page={offset}
                siblingCount={2}
                onChange={handlePaginationOnChange}
                variant="outlined"
                color="primary"
              />
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
          dispatch(eliminarTareaPorId(tareaId.current || ''));
          setMostrarDialogo(false);
        }}
      />
    </Box>
  );
};

export default TareasPage;
