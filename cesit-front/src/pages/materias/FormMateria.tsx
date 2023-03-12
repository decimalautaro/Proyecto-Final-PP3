import { Button, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInputText from '../../components/form/MyInputText';
import MyDropdown, { DropdownOption } from '../../components/form/MyDropdown';
import { Profesor } from '../../models/Profesor';
import { buscarProfesores } from '../../slices/profesoresSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';


export interface IFormInputs {
  nombre: string;
  profesor: Profesor | string;
  duracion: string;
  condicionMateria: string;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    profesor: yup.string().required('El profesor es requerido'),
    duracion: yup.string().required('La duracion es requerida'),
    condicionMateria: yup
      .string()
      .required('El campo condicion final de la materia es requerido'),
  })
  .required();

interface FormMateriaProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}
const FormMaterias: FC<FormMateriaProps> = ({ data, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      nombre: data?.nombre,
      profesor: ((data?.profesor || {}) as Profesor)._id,
      duracion: data?.duracion,
      condicionMateria: data?.condicionMateria
    } || {} as Profesor,
    resolver: yupResolver(schemaValidator),
  });

  const dispatch = useAppDispatch();
  const { profesores } = useAppSelector((state) => state.profesor)

  useEffect(() => {
    dispatch(buscarProfesores({ limit: 100, offset: 0 }));
  }, []);

  const navigate = useNavigate();

  const condicion: DropdownOption[] = [
    { value: 'regular', label: 'Regular' },
    { value: 'promocion', label: 'Promoción' },
    { value: 'libre', label: 'Libre' },
    { value: 'recursa', label: 'Recursa' },
  ];

  const duracion: DropdownOption[] = [
    { value: 'anual', label: 'Anual' },
    { value: 'semestral', label: 'Semestral' },
  ];

  const profesor: DropdownOption[] = []

  profesores.map((prof) => {
    const objeto: any = { value: prof._id, label: prof.nombre + " " + prof.apellido }
    profesor.push(objeto)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyInputText name="nombre" control={control} label="Nombre" />
        </Grid>
        <Grid item xs={12}>
          <MyDropdown
            name="duracion"
            control={control}
            options={duracion}
            label="Duracion"
          />
        </Grid>
        <Grid item xs={12}>
          <MyDropdown
            name="condicionMateria"
            control={control}
            options={condicion}
            label="Condicion Materia"
          />
        </Grid>
        <Grid item xs={12}>
          <MyDropdown
            name="profesor"
            control={control}
            options={profesor}
            label="Profesor"
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            <Button
              type="submit"
              variant="contained">
              Guardar
            </Button>
            <Button
              variant="outlined"
              value="Cancelar"
              onClick={() => navigate(`/materias`)}
            >
              Cancelar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormMaterias;
