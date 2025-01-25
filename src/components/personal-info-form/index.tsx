import * as React from 'react';
import {Controller,  useFormContext} from 'react-hook-form';
import {

  TextField,
  Typography,
  Box,

} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {FormInputText} from "../shared/text-field";
import {FormInputDate} from "../shared/date-picker";
import {PatternFormat} from "react-number-format";


function PersonalInfoForm() {

  const { control } = useFormContext();
  return (
      <React.Fragment>
            <Typography  variant='h5' align='center' fontWeight="bold">
            Персональная информация
            </Typography>
<Box sx={{my:3}}>
  <Grid container spacing={2}>
    <Grid  size={12}>
      <FormInputText type="text" name="personalInfo.name" control={control} label="Имя" />
    </Grid>

    <Grid size={12}>
      <FormInputText type="text" name="personalInfo.surName" control={control} label="Фамилия" />
    </Grid>

    <Grid size={12}>
      <FormInputDate   name="personalInfo.dateValue" control={control} label="Дата рождения " />
    </Grid>

    <Grid size={12}>
      <Controller
        name="personalInfo.number"
        control={control}
        render={({ field, fieldState }) => (
          <PatternFormat
            name="personalInfo.number"
            getInputRef={field.ref}
            onBlur={field.onBlur}
            label="Телефон"
            value={field.value}
            customInput={TextField}
            size="small"
            onValueChange={(value) => {
              field.onChange(value.value);
            }}
            variant="outlined"
            format="+7 ### ### ## ##"
            autoComplete="off"
            fullWidth
            error={!!fieldState.error?.message}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </Grid>

    <Grid size={12}>
      <FormInputText type="text"  name="personalInfo.email" control={control} label="Email" />
    </Grid>
  </Grid>
</Box>
      </React.Fragment>

  );
}
export default  PersonalInfoForm