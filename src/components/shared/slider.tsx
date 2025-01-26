import React from "react";
import { FormLabel, Slider } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../types/form-input-props";

export const FormInputSlider = ({
  name,
  control,
  min,
  max,
  label,
  defaultValue,
}: FormInputProps) => {
  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Slider
            defaultValue={min}
            onChange={field.onChange}
            valueLabelDisplay="auto"
            max={max}
            min={min}
            value={field.value}
          />
        )}
      />
    </>
  );
};
