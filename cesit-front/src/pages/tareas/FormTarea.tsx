import { Button, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInputText from '../../components/form/MyInputText';
import MyTextArea from '../../components/form/MyTextArea';
import MyCheckbox from '../../components/form/MyCheckbox';
import MyInputDate from '../../components/form/MyInputDate';
import MyInputSlider from '../../components/form/MyInputSlider';
import MyRadioButton, {
  RadioButtonOption,
} from '../../components/form/MyRadioButton';
import MyDropdown from '../../components/form/MyDropdown';

export interface IFormInputs {
  nombre: string;
  descripcion: string;
  finalizada: boolean;
  fechaLimite?: Date | undefined;
  progreso: number;
  asignado?: string | undefined;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    descripcion: yup.string().required('La descripcion es requerida'),
  })
  .required();

interface FormTareaProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}

const FormTarea: FC<FormTareaProps> = ({ data, onSubmit }) => {
  const navigate = useNavigate();
  const { control, setValue, handleSubmit } = useForm<IFormInputs>({
    defaultValues: data || { fechaLimite: new Date() },
    resolver: yupResolver(schemaValidator),
  });

  const options: RadioButtonOption[] = [
    { label: 'Profesores', value: 'Profesores' },
    { label: 'Bedel', value: 'Bedel' },
    { label: 'Alumnos', value: 'Alumnos' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyRadioButton
            name="Roles"
            control={control}
            label="Roles"
            options={options}
          />
        </Grid>
        <Grid item xs={12}>
          <MyInputText name="nombre" control={control} label="Nombre" />
        </Grid>

        <Grid item xs={12}>
          <MyTextArea name="descripcion" control={control} label="Descripcion" />
        </Grid>
        <Grid item xs={12}>
          <MyCheckbox name="finalizada" control={control} label="Finalizada?" />
        </Grid>
        <Grid item xs={12}>
          <MyInputDate
            name="fechaLimite"
            control={control}
            label="Fecha Límite"
          />
        </Grid>
        <Grid item xs={12}>
          <MyInputSlider
            name="progreso"
            control={control}
            label="Progreso"
            setValue={setValue}
          />
        </Grid>
        <Grid item xs={12}>
          <MyDropdown
            name="asignado"
            label="Buscar por"
            control={control}
            options={[
              { label: 'Nombre', value: 'nombre' },
              { label: 'Nombre2', value: 'nombre2' },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
            <Button
              variant="outlined"
              value="Cancelar"
              onClick={() => navigate(`/tareas`)}
            >
              Cancelar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormTarea;
