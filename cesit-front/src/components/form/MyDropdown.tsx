import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import InputProps from './InputProps';

export interface DropdownOption {
  label: string;
  value: string;
}

interface MyDropdownProps extends InputProps {
  options: DropdownOption[];
}

const MyDropdown: FC<MyDropdownProps> = ({ name, control, label, options }) => {
  const generateSingleOptions = (): JSX.Element[] => {
    return options.map((option: any) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <FormControl size={'small'} fullWidth>
      <Controller
        render={({ field: { onChange, value } }) => (
          <>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
              label={label}
              onChange={onChange}
              value={value}
              fullWidth
            >
              {generateSingleOptions()}
            </Select>
          </>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

export default MyDropdown;
