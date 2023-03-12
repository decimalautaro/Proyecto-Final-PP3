import { Box, Grid, Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomLabelItem from '../../components/CustomLabelItem';
import { buscarMateriaPorId } from '../../slices/materiasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import LinkLabelItem from '../../components/LinkLabelItem';
import { TableEditBtn } from '../../components/table/TableButtons';

const MateriasVerPage: FC = () => {
    const { id } = useParams();
    const { cargando, materiaSeleccionada } = useAppSelector((state) => state.materia);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) dispatch(buscarMateriaPorId(id));
    }, [id, dispatch]);

    if (cargando) {
        return <div>Loading...</div>;
    }
    if (!materiaSeleccionada) {
        return <div>Materia no econtrada</div>;
    }

    const nombreProfesor = materiaSeleccionada.profesor.nombre + " " + materiaSeleccionada.profesor.apellido;

    return (
        <Box display="flex" flexDirection="column" gap={3} padding={2}>
            <Typography variant="h3">Visualizando Materia</Typography>
            <Stack direction="row" spacing={5}>
                <Link to="/materias">Volver</Link>
                <TableEditBtn onClick={() => navigate(`/materias/${materiaSeleccionada._id}/editar`)} />
            </Stack >
            <Grid container spacing={2}>

                <CustomLabelItem
                    label="Nombre"
                    value={materiaSeleccionada.nombre}
                />

                <LinkLabelItem
                    label='Profesor'
                    value={nombreProfesor}
                    onClick={() => navigate(`/profesores/${materiaSeleccionada.profesor._id}/ver`)}
                />

                <CustomLabelItem
                    label="Duracion"
                    value={materiaSeleccionada.duracion}
                />

                <CustomLabelItem
                    label="Condicion Materia"
                    value={materiaSeleccionada.condicionMateria}
                />

            </Grid>
        </Box >
    );
};

export default MateriasVerPage;
