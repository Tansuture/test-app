import "dayjs/locale/ru";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { FormInputProps } from "../../types/form-input-props";
import dayjs from "dayjs";

export const FormInputDate = ({ name, control, label }: FormInputProps) => {
  return (
    <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label={label}
            disableFuture
            value={field.value ? dayjs(field.value) : null}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                helperText: error?.message,
                error: !!error,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
