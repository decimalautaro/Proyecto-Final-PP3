import { Button, Divider, Grid, ListItem, Stack, TextField, ListItemText, List } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

import MyInputText from '../../components/form/MyInputText';

import MyInputDate from '../../components/form/MyInputDate';

import { IDomicilio } from '../../models/Domicilio';
export interface IFormInputs {
  nombre: string;
  apellido: string;
  dni: string;
  domicilio: IDomicilio[];
  fechaNacimiento: Date | undefined;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    dni: yup.string().max(8, 'No puede ser mayor que 8 digitos').required('El dni es requerido'),
    domicilio: yup.array().of(
      yup.object().shape({
        calle: yup.string().required('La calle es requerida'),
        numero: yup.string().required('El numero es requerido'),
        localidad: yup.string().required('La localidad es requerida'),
        provincia: yup.string().required('La provincia es requerida'),
      })
    ),
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
    defaultValues: data || { domicilio: [] },
    resolver: yupResolver(schemaValidator),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "domicilio"
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


        <List >
          {fields.map((item, index) => {
            return (


              <ListItem dense key={item.id}>

                <MyInputText

                  name={`domicilio.${index}.calle`}
                  control={control}
                  label="calle"
                />

                <MyInputText

                  name={`domicilio.${index}.numero`}
                  control={control}
                  label="numero"

                />


                <MyInputText

                  name={`domicilio.${index}.localidad`}
                  control={control}
                  label="localidad"
                />


                <MyInputText
                  name={`domicilio.${index}.provincia`}
                  control={control}
                  label="provincia"
                />

                <MyInputText
                  name={`domicilio.${index}.referencia`}
                  control={control}
                  label="referencia"
                />

                <Button sx={{ m: 1 }} variant="contained" size="small" type="button" onClick={() => remove(index)}>
                  ELIMINAR
                </Button>

              </ListItem>
            );
          })}
        </List>

        <Button
          sx={{ m: 2 }}
          variant="outlined"
          type="button"
          onClick={() => {
            append({ calle: "", numero: "", localidad: "", provincia: "" });
          }}
        >
          AGREGAR DOMICILIO
        </Button>
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
