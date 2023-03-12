import { Box, Button, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import MyDropdown, { DropdownOption } from '../../../components/form/MyDropdown';
import MyInputText from '../../../components/form/MyInputText';
import { buscarProfesores, setCriterio } from '../../../slices/profesoresSlice';
import { useAppDispatch } from '../../../store/hooks';

export interface IFormBuscar {
  tipo: string;
  busqueda: string;
}

const BuscarProfesores: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCriterio(null));
  }, []);

  const { control, handleSubmit, formState, reset } = useForm<IFormBuscar>({
    defaultValues: {
      tipo: 'nombre',
    },
  });

  const onSubmit = (data: IFormBuscar) => {
    const criterio: Record<string, string> = {
      [data.tipo as string]: data.busqueda as string,
    };
    dispatch(setCriterio(criterio));
    dispatch(buscarProfesores());
  };

  const limpiarBusqueda = () => {
    reset({ busqueda: '' });
    dispatch(setCriterio(null));
    dispatch(buscarProfesores());
  };

  const options: DropdownOption[] = [
    { label: 'Nombre', value: 'nombre' },
    { label: 'Apellido', value: 'apellido' },
    { label: 'DNI', value: 'dni' },
    // { label: 'Edad', value: 'edad'},
  ];

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" gap={1}>
          <MyDropdown
            name="tipo"
            control={control}
            label="Buscar por"
            options={options}
          />

          <MyInputText
            name="busqueda"
            control={control}
            label="Criterio de busqueda"
          />

          <Button type="submit" variant="outlined">
            Buscar
          </Button>
          <Button onClick={limpiarBusqueda} variant="outlined" color="success">
            X
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BuscarProfesores;
