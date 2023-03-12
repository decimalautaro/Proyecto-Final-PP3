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
  Pagination
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { buscarCurso, eliminarCursoPorId, limpiarCurso } from '../../slices/cursosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TableDeleteBtn, TableEditBtn, TableShowBtn } from '../../components/table/TableButtons';
import BuscarCursos from './components/BuscarCursos';
import ConfirmationModalCurso from '../../components/modals/ConfirmationModalCurso';
const CursosPage = () => {

  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const cursoId = useRef<string>();
  const { cargando, cursos, mensajeError, cantidadPaginas, offset, limit } = useAppSelector(state => state.curso);


  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarCurso());

    return () => {
      if (!window.location.pathname.startsWith("/cursos")) {
        dispatch(limpiarCurso());
      }
    }
  }, []);

  const handlePaginationOnChange = (ev: ChangeEvent<unknown>, offset: number) => {
    dispatch(buscarCurso({ offset, limit }));
  }
  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <Typography variant='h3'>Listando Cursos</Typography>
      <Button variant="contained" size="small" onClick={() => navigate("/curso/nuevo")}>Nuevo Curso</Button>

      <BuscarCursos />

      {mensajeError && <Box marginTop={2}>
        <Alert severity="error" color="error">
          {mensajeError}
        </Alert>
      </Box>}

      {cargando ?
        (<Box marginTop={2}><LinearProgress color="secondary" /></Box>)
        : (
          !mensajeError && (
            <>
              <TableContainer>

                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Año</TableCell>
                      <TableCell align="right">Cantidad Alumnos</TableCell>
                      <TableCell align="right">Carrera</TableCell>
                      <TableCell align="right">Bedelia</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {cursos.map(curso => (
                      <TableRow
                        key={curso._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {curso.anio}
                        </TableCell>
                        <TableCell align="right">{curso.cantidadAlumnos}</TableCell>
                        <TableCell align="right">{curso.carrera}</TableCell>
                        <TableCell align="right">{curso.bedelia}</TableCell>
                        <TableCell align="right">
                          <TableShowBtn onClick={() => navigate(`/cursos/${curso._id}/ver`)} />
                          <TableEditBtn onClick={() => navigate(`/cursos/${curso._id}/editar`)} />
                          <TableDeleteBtn onClick={() => {
                            cursoId.current = curso._id;
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
      <ConfirmationModalCurso
        open={mostrarDialogo}
        message="Está seguro que desea eliminar el curso seleccionado."
        onClose={() => setMostrarDialogo(false)}
        onNo={() => setMostrarDialogo(false)}
        onYes={() => {
          dispatch(eliminarCursoPorId(cursoId.current || ''));
          setMostrarDialogo(false);
        }}
      />
    </Box>
  )
}

export default CursosPage