import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import { FC } from 'react';
import InputProps from './InputProps';

export interface RadioButtonOption {
  label: string;
  value: string;
}

interface MyRadioButtoonProps extends InputProps {
  options: RadioButtonOption[];
}

const MyRadioButton: FC<MyRadioButtoonProps> = ({ label, options }) => {
  const generateSingleOptions = (): JSX.Element[] => {
    return options.map((option: any) => (
      <FormControlLabel
        key={option.value}
        value={option.value}
        control={<Radio />}
        label={option.label}
      />
    ));
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {generateSingleOptions()}
      </RadioGroup>
    </FormControl>
  );
};

export default MyRadioButton;
