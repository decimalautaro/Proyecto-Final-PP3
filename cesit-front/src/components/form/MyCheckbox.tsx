import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
import InputProps from './InputProps'

const MyCheckbox = ({ name, control, label }: InputProps) => {
  return (
    <FormControlLabel
          control={
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Checkbox {...field} checked={field.value || false} />
              )}
            />
          }
          label={label}
        />
  )
}

export default MyCheckbox