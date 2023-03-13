import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarMateriaService } from '../../services/materias-services';
import { buscarMateriaPorId } from '../../slices/materiasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FormMateria, { IFormInputs } from './FormMateria';

const MateriasEditarPage = () => {
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

    const actualizandoMateria = async (data: IFormInputs) => {
        try {
            if (!id) return;
            //@ts-ignore
            await actualizarMateriaService(id, data);
            navigate('/materias');
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <Box>
            <Typography variant="h3">Editar Materia</Typography>
            <FormMateria data={materiaSeleccionada} onSubmit={actualizandoMateria} />
        </Box>
    );
};

export default MateriasEditarPage;