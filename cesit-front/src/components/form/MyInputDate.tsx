import { TextField } from '@mui/material';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { DATE_FORMAT } from '../../utils/constants';
import InputProps from './InputProps';

interface InputDateProps extends InputProps {
  inputType?: 'mobile' | 'desktop';
}

const MyInputDate: FC<InputDateProps> = ({
  name,
  control,
  label,
  inputType,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, ...props }) => {
        if (inputType !== 'mobile') {
          return (
            <DatePicker
              label={label}
              value={field.value}
              inputFormat={DATE_FORMAT}
              onChange={(newValue) => {
                field.onChange(newValue || new Date());
              }}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          );
        }
        return (
          <MobileDatePicker
            label={label}
            value={field.value}
            inputFormat={DATE_FORMAT}
            onChange={(newValue) => {
              field.onChange(newValue || new Date());
            }}
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        );
      }}
    />
  );
};

export default MyInputDate;
