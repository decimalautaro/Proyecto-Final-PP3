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
  buscarMaterias,
  eliminarMateriaPorId,
  limpiarMaterias,
} from '../../slices/materiasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BuscarMaterias from './components/BuscarMaterias';
import {
  TableDeleteBtn,
  TableEditBtn,
  TableShowBtn,
} from '../../components/table/TableButtons';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import TitulosApp from '../../components/TitulosApp';

const MateriasPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const materiaId = useRef<string>();
  const { cargando, materias, mensajeError, cantidadPaginas, offset, limit } =
    useAppSelector((state) => state.materia);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarMaterias());

    return () => {
      if (!window.location.pathname.startsWith('/materias')) {
        dispatch(limpiarMaterias());
      }
    };
  }, []);

  const handlePaginationOnChange = (
    ev: ChangeEvent<unknown>,
    offset: number
  ) => {
    dispatch(buscarMaterias({ offset, limit }));
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <TitulosApp title="Listando Materias">
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate('/materias/nuevo')}
          fullWidth
        >
          Nueva Materia
        </Button>
      </TitulosApp>

      <BuscarMaterias />

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
                    <TableCell align="center">Profesor</TableCell>
                    <TableCell align="center">Duracion</TableCell>
                    <TableCell align="center">Condicion Materia</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materias.map((materia) => (
                    <TableRow
                      key={materia._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {materia.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {materia.profesor.nombre + " " + materia.profesor.apellido}
                      </TableCell>
                      <TableCell align="center">
                        {materia.duracion}
                      </TableCell>
                      <TableCell align="center">{materia.condicionMateria}</TableCell>
                      <TableCell align="right">
                        <TableShowBtn
                          onClick={() => navigate(`/materias/${materia._id}/ver`)}
                        />
                        <TableEditBtn
                          onClick={() => navigate(`/materias/${materia._id}/editar`)}
                        />
                        <TableDeleteBtn
                          onClick={() => {
                            materiaId.current = materia._id;
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
        message="Está seguro que desea eliminar la materia seleccionada."
        onClose={() => setMostrarDialogo(false)}
        onNo={() => setMostrarDialogo(false)}
        onYes={() => {
          dispatch(eliminarMateriaPorId(materiaId.current || ''));
          setMostrarDialogo(false);
        }}
      />
    </Box>
  );
};

export default MateriasPage;
