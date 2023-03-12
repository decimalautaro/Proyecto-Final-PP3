import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputProps from './InputProps';

interface MyInputText extends InputProps {
  password?: boolean;
}

const MyInputText = ({
  name,
  control,
  label,
  password = false,
}: MyInputText) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          type={password ? 'password' : 'text'}
          variant="outlined"
        />
      )}
    />
  );
};

export default MyInputText;
