import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputProps from './InputProps';

const MyTextArea = ({ name, control, label }: InputProps) => {
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
              rows={4}
              label={label}
              variant="outlined"
              multiline
            />
          )}
        />
      );
}

export default MyTextArea