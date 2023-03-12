import { Box, Typography } from '@mui/material';
import { crearMateriaService } from '../../services/materias-services';
import FormMateria, { IFormInputs } from './FormMateria';
import { useNavigate } from 'react-router-dom';

const MateriasNuevaPage = () => {
    const navigate = useNavigate();

    const onSubmit = async (data: IFormInputs) => {
        try {
            //@ts-ignore
            await crearMateriaService(data);
            navigate('/materias');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <Typography variant="h3">Nueva Materia</Typography>
            < br />
            <FormMateria onSubmit={onSubmit} />
        </Box>
    );
};

export default MateriasNuevaPage;
