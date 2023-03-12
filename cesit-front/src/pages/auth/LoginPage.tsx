import { Button, Grid } from '@mui/material';
import MyInputText from '../../components/form/MyInputText';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';

const schemaValidator = yup
  .object({
    email: yup.string().required('El email es requerido'),
    password: yup.string().required('El password es requerido'),
  })
  .required();

interface IFormLoginProps {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authenticated, mensajeError } = useAppSelector((state) => state.user);
  const { control, setValue, handleSubmit } = useForm<IFormLoginProps>({
    resolver: yupResolver(schemaValidator),
  });

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [mensajeError, authenticated]);

  const onSubmit = (data: IFormLoginProps) => {
    dispatch(loginUser(data));
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MyInputText name="email" control={control} label="Email" />
          </Grid>
          <Grid item xs={12}>
            <MyInputText
              name="password"
              control={control}
              label="Password"
              password
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginPage;
