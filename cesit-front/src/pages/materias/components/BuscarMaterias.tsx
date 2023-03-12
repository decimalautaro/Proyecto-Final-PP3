import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import MyDropdown, { DropdownOption } from '../../../components/form/MyDropdown';
import MyInputText from '../../../components/form/MyInputText';
import { buscarMaterias, setCriterio } from '../../../slices/materiasSlice';

import { useAppDispatch } from '../../../store/hooks';

export interface IFromBuscar {
  tipo: string;
  busqueda: string;
}

const BuscarMaterias: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(setCriterio(null));
  }, []);

  const {
      control,
      handleSubmit,
      formState,
      reset,
  } = useForm<IFromBuscar>({
      defaultValues: {
          tipo: 'nombre',
      },
  });

  const onSubmit = (data: IFromBuscar) => {
      const criterio: Record<string, string> = {
          [data.tipo as string]: data.busqueda as string
      };
      dispatch(setCriterio(criterio));
      dispatch(buscarMaterias());
  };

  const limpiarBusqueda = () => {
      reset({ busqueda: '' });
      dispatch(setCriterio(null));
      dispatch(buscarMaterias());
  }

  const options: DropdownOption[] = [
      { label: 'Nombre', value: 'nombre' },
      { label: 'Profesor', value: 'profesor' },
      { label: 'Duracion', value: 'duracion' },
      { label: 'Condicion Materia', value: 'condicionMateria' },
      //   { label: 'Todo', value: '_todos' }
  ]

  return (
      <Box>
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

export default BuscarMaterias;