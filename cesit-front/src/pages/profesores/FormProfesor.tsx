import { Button, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInputText from '../../components/form/MyInputText';
import MyInputDate from '../../components/form/MyInputDate';
import SeleccionarMateria from './components/seleccionarMateria';

export interface IFormInputs {
  nombre: string;
  apellido: string;
  dni: number;
  fechaNacimiento: Date;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    dni: yup.number().required('El número de DNI es requerido'),
    fechaNacimiento: yup.date().required('La fecha de nacimiento es requerida'),
  })
  .required();

interface FormProfesorProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}

const FormProfesor: FC<FormProfesorProps> = ({ data, onSubmit }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
  } = useForm<IFormInputs>({
    defaultValues: data || { fechaNacimiento: new Date() },
    resolver: yupResolver(schemaValidator),
  });


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyInputText name="nombre" control={control} label="Nombre" />
        </Grid>
        <Grid item xs={12}>
          <MyInputText name="apellido" control={control} label="Apellido" />
        </Grid>
        <Grid item xs={12}>
          <MyInputText name="dni" control={control} label="DNI" />
        </Grid>
        <Grid item xs={12}>
          <MyInputDate name="fechaNacimiento" control={control} label="Fecha de Nacimiento" />
        </Grid>
        <Grid item xs={4}>
          <SeleccionarMateria/>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" >Guardar</Button>
            <Button
              variant="outlined"
              value="Cancelar"
              onClick={() => navigate(`/profesores`)}
            >Cancelar</Button>
          </Stack>
        </Grid>

      </Grid>
    </form>
);
};

export default FormProfesor;
