import { Button, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

import MyInputText from '../../components/form/MyInputText';
import MyTextArea from '../../components/form/MyTextArea';
import MyCheckbox from '../../components/form/MyCheckbox';
import MyInputDate from '../../components/form/MyInputDate';
import MyInputSlider from '../../components/form/MyInputSlider';
export interface IFormInputs {
  nombre: string;
  apellido: string;
  dni: string;
  domicilio: string;
  fechaNacimiento: Date | undefined;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    dni: yup.string().required('El dni es requerido'),
    domicilio: yup.string().required('El domicilio es requerido'),
    fechaNacimiento: yup.date().required('La fecha de nacimiento es requerida'),
  })
  .required();

interface FormAlumnoProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}

const FormAlumno: FC<FormAlumnoProps> = ({ data, onSubmit }) => {
  
  const navigate = useNavigate();
  const {
    control,
    setValue,
    handleSubmit,
  } = useForm<IFormInputs>({
    defaultValues: data || {},
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
            <MyInputText name="domicilio" control={control} label="Domicilio" />
          </Grid>
          <Grid item xs={12}>
            <MyInputDate name="fechaNacimiento" control={control} label="Fecha de nacimiento" />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained" >Guardar</Button>
              <Button
                variant="outlined"
                value="Cancelar"
                onClick={() => navigate(`/alumnos`)}
              >Cancelar</Button>
            </Stack>
          </Grid>

        </Grid>
      </form>
  )
};

export default FormAlumno;
