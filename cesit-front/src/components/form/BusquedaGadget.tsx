import {
    Box,
    Button,
    Typography,
} from '@mui/material';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import MyDropdown, { DropdownOption } from './MyDropdown';
import MyInputText from './MyInputText';

export interface IFromBuscar {
    tipo: string;
    busqueda: string;
}

interface IBusquedaGadget {
    setCriterio: (criterio: Record<string, string> | null) => void;
    realizarBusqueda: () => void;
    options: DropdownOption[]
}


const BusquedaGadget: FC<IBusquedaGadget> = ({ setCriterio, realizarBusqueda, options }) => {

    useEffect(() => {
        //dispatch(setCriterio(null));
        setCriterio(null);
    }, []);

    const {
        control,
        handleSubmit,
        formState,
        reset,
    } = useForm<IFromBuscar>({
        defaultValues: {
            tipo: 'busqueda',
        },
    });

    const onSubmit = (data: IFromBuscar) => {
        const criterio: Record<string, string> = {
            [data.tipo as string]: data.busqueda as string
        };
        setCriterio(criterio);
        realizarBusqueda();
    };

    const limpiarBusqueda = () => {
        reset({ busqueda: '' });
        setCriterio(null);
        realizarBusqueda();
    }

    return (
        <Box mt={3} mb={3}>
            <Typography>Buscar por</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" gap={1}>
                    <MyDropdown name='tipo' control={control} label="Buscar por" options={options} />

                    <MyInputText name='busqueda' control={control} label="Criterio de busqueda" />

                    <Button type="submit" variant="outlined">
                        Buscar
                    </Button>
                    <Button onClick={limpiarBusqueda} variant="outlined" color='success'>
                        X
                    </Button>
                </Box>

            </form>
        </Box>
    );
};

export default BusquedaGadget;
