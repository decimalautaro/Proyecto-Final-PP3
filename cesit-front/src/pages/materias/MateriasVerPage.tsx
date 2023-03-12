import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomLabelItem from '../../components/CustomLabelItem';
import { buscarMateriaPorId } from '../../slices/materiasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

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

    return (
        <Box>
            <Typography variant="h3">Visualizando Materia</Typography>

            <Grid item xs={12} md={6}>
                <List >
                    <ListItem>
                        <ListItemIcon>
                            <LibraryBooksIcon />
                        </ListItemIcon>

                        <CustomLabelItem label="Nombre " value={materiaSeleccionada.nombre} />

                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>

                        <CustomLabelItem label="Profesor" value={materiaSeleccionada.profesor} />

                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AccessTimeIcon />
                        </ListItemIcon>

                        <CustomLabelItem label="Duracion" value={materiaSeleccionada.duracion} />

                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FormatListBulletedIcon />
                        </ListItemIcon>

                        <CustomLabelItem label="Condicion Materia" value={materiaSeleccionada.condicionMateria} />

                    </ListItem>
                </List>
            </Grid>
            <Button
                variant="outlined"
                color="error"
                onClick={() => navigate('/materias')}
            >
                Vovler
            </Button>
        </Box >
    );
};

export default MateriasVerPage;