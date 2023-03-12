import { Button, ButtonGroup, Grid, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { crearCarreraService } from '../../services/carreras-services';

import { FC } from 'react';
import { Link } from 'react-router-dom';
import MyInputText from '../../components/form/MyInputText';
import MyButtonGroup, { ButtonGroupOption } from '../../components/form/MyButtonGroup';

export interface IFormInputs {
  nombre: string;
  duracion: string;
  horario: string;
  plan: string;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    duracion: yup
      .string()
      .required('La duración es requerida')
      .typeError('La duración debe ser un número'),
    horario: yup.string().required('El horario es requerido'),
    plan: yup.string().required('El plan es requerido'),
  })
  .required();

interface FormCarreraProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}

const FormCarrera: FC<FormCarreraProps> = ({ data, onSubmit }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IFormInputs>({
    defaultValues: data || { nombre: '', duracion: '', horario: '', plan: '' },
    resolver: yupResolver(schemaValidator),
  });

  const options: ButtonGroupOption[] = [
    { label: 'Mañana', value: 'manana' },
    { label: 'Tarde', value: 'tarde' },
    { label: 'Noche', value: 'noche' }
  ]
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyInputText name="nombre" control={control} label="Nombre" />
        </Grid>
        <Grid item xs={12}>
          <MyInputText name="duracion" control={control} label="Duración" />
        </Grid>
        <Grid item xs={12}>
          <MyButtonGroup name='horario' control={control} label="Horario" options={options} clickHandler={setValue} />
        </Grid>
        <Grid item xs={12}>
          <MyInputText name="plan" control={control} label="Plan" />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained"  >Guardar</Button>
            <Button
              variant="outlined"
              value="Cancelar"
              onClick={() => navigate(`/carreras`)}
            >Cancelar</Button>
          </Stack>
        </Grid>

      </Grid>

    </form>

  );
};

export default FormCarrera;
