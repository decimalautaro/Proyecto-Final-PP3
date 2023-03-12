import { FormLabel, Slider } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import InputProps from './InputProps';

const MyInputSlider = ({ name, control, setValue, label }: InputProps) => {
  const [sliderValue, setSliderValue] = React.useState<number>(0);

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
  }, [sliderValue]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <Slider
            value={field.value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={1}
          />
        )}
      />
    </>
  );
};

export default MyInputSlider;
