
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import InputProps from "./InputProps";


export interface ButtonGroupOption {
  label: string;
  value: string;
};

interface MyButtonGroupProps extends InputProps {
  options: ButtonGroupOption[];
  clickHandler: any
}
// estilos
const active = { backgroundColor: '#692C3C', color: 'white' }

const MyButtonGroup: FC<MyButtonGroupProps> = ({
  name,
  control,
  label,
  options,
  clickHandler

}) => {
  const indexOptionSelected = options && options
    .map((option, i) => option.value === control._defaultValues.horario ? i : -1)
    .find((option) => option !== -1)

  const initialClickedClass = (!control._defaultValues._id)
    ? { 'active': -1 }
    : { 'active': indexOptionSelected }

  const [clickedClass, setClickedClass] = useState(initialClickedClass)

  const generateSingleOptions = (): JSX.Element[] => {
    return options.map((option: any, index: number) => (
      <Button
        key={option.value}
        style={clickedClass.active === index ? active : {}}
        onClick={(e) => {
          clickHandler('horario', option.value)
          setClickedClass({ 'active': index })
        }}
      >
        {option.label}
      </Button>
    )
    );
  };

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange },
          fieldState: { error },
          formState,
        }) => {

          return (
            <>
              <label>{label}</label>
              <ButtonGroup
              >
                {generateSingleOptions()}
              </ButtonGroup>
            </>
          )

        }
        }
      />
    </FormControl>



  );
};

export default MyButtonGroup;