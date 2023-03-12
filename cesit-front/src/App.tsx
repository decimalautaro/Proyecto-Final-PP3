import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Ejemplos from './pages/ejemplos/Ejemplos';
import HomePage from './pages/HomePage';
import TareasPage from './pages/tareas/TareasPage';
import TareasNuevaPage from './pages/tareas/TareasNuevaPage';
import AlumnoPage from './pages/alumnos/AlumnoPage';
import MateriaPage from './pages/materias/MateriaPage';
import TareasEditarPage from './pages/tareas/TareasEditarPage';
import TareasVerPage from './pages/tareas/TareasVerPage';
import { Provider } from 'react-redux';
import store from './store/store';
import CarerrasPage from './pages/carreras/CarerrasPage';
import CarreraNuevoPage from './pages/carreras/CarreraNuevoPage';
import CarrerasVerPage from './pages/carreras/CarrerasVerPage';
import CursosNuevoPage from './pages/cursos/CursosNuevoPage';
import CursosVerPage from './pages/cursos/CursosVerPage';
import CursosPage from './pages/cursos/CursosPage';
import MateriasNuevaPage from './pages/materias/MateriasNuevaPage';
import MateriasVerPage from './pages/materias/MateriasVerPage';
import MateriasEditarPage from './pages/materias/MateriasEditarPage';
import AlumnoNuevaPage from './pages/alumnos/AlumnoNuevaPage';
import AlumnoEditarPage from './pages/alumnos/AlumnoEditarPage';
import AlumnoVerPage from './pages/alumnos/AlumnoVerPage';
import CarreraEditarPage from './pages/carreras/CarreraEditarPage';
import CursoEditarPage from './pages/cursos/CursoEditarPage';
import ProfesoresPage from './pages/profesores/ProfesoresPage';
import ProfesoresEditarPage from './pages/profesores/ProfesoresEditarPage';
import ProfesoresNuevoPage from './pages/profesores/ProfesoresNuevoPage';
import ProfesoresVerPage from './pages/profesores/ProfesoresVerPage';
import LoginPage from './pages/auth/LoginPage';
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';

const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#692C3C',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mdTheme}>
        <Routes>
          <Route path="/" element={<PrivateLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/ejemplos" element={<Ejemplos />} />
            <Route path="/tareas" element={<TareasPage />} />
            <Route path="/tareas/nueva" element={<TareasNuevaPage />} />
            <Route path="/tareas/:id/ver" element={<TareasVerPage />} />
            <Route path="/tareas/:id/editar" element={<TareasEditarPage />} />
            <Route path="/tareas/:id/editar" element={<TareasNuevaPage />} />

            <Route path="/alumnos" element={<AlumnoPage />} />
            <Route path="/alumnos/nuevo" element={<AlumnoNuevaPage />} />
            <Route path="/alumnos/:id/editar" element={<AlumnoEditarPage />} />
            <Route path="/alumnos/:id/ver" element={<AlumnoVerPage />} />

            <Route path="/materias" element={<MateriaPage />} />
            <Route path="/materias/nuevo" element={<MateriasNuevaPage />} />
            <Route path="/materias/:id/ver" element={<MateriasVerPage />} />
            <Route
              path="/materias/:id/editar"
              element={<MateriasEditarPage />}
            />

            <Route path="/materias" element={<MateriaPage />} />
            <Route path="/tareas/:id/editar" element={<TareasNuevaPage />} />

            <Route path="/carreras" element={<CarerrasPage />} />
            <Route path="/carrera/nueva" element={<CarreraNuevoPage />} />
            <Route path="/carreras/:id/ver" element={<CarrerasVerPage />} />
            <Route path="/carreras/:id/editar" element={<CarreraEditarPage />} />

            <Route path="/cursos" element={<CursosPage />} />
            <Route path="/curso/nuevo" element={<CursosNuevoPage />} />
            <Route path="/cursos/:id/ver" element={<CursosVerPage />} />
            <Route path="/cursos/:id/editar" element={<CursoEditarPage />} />

            <Route path="/profesores" element={<ProfesoresPage />} />
            <Route path="/profesores/nuevo" element={<ProfesoresNuevoPage />} />
            <Route path="/profesores/:id/ver" element={<ProfesoresVerPage />} />
            <Route
              path="/profesores/:id/editar"
              element={<ProfesoresEditarPage />}
            />
          </Route>
          <Route path="/login" element={<PublicLayout />}>
            <Route index element={<LoginPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
