import React from 'react';
import {FormInputProps} from "../../types/form-input-props";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputText = ({ name, control, label,type }: FormInputProps) => {
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const value = e.target.value;
    let sanitizedValue = value;

    switch(type) {
      case 'text':
        sanitizedValue = value.replace(/[^a-zA-Zа-яА-Я\s]/g, '');
        break;
      case 'number':
        sanitizedValue = value.replace(/[^0-9]/g, '');
        break;
      case 'email':
        sanitizedValue = value.toLowerCase().replace(/[^a-z0-9@._-]/g, '');
        break;
    }

    onChange(sanitizedValue);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({
                 field: { onChange, value },
                 fieldState: { error },

               }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
           handleOnChange(e,onChange)
          }}
          value={value}
          fullWidth
          label={label}
          variant='outlined'

        />
      )}
    />
  );
};