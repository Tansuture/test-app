import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Typography, Box, Autocomplete } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FormInputText } from "../shared/text-field";
import { PatternFormat } from "react-number-format";
import { countries } from "../../dictionary";

function AddressInfoForm() {
  const { control } = useFormContext();
  return (
    <React.Fragment>
      <Typography variant="h5" align="center" fontWeight="bold">
        Адресная информация
      </Typography>
      <Box sx={{ my: 3 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              name="addressInfo.country"
              control={control}
              defaultValue={null}
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <Autocomplete
                  id="country-select-demo"
                  fullWidth
                  options={countries}
                  value={value || null}
                  onChange={(_, newValue) => onChange(newValue)}
                  autoHighlight
                  size="small"
                  getOptionLabel={(option) => option?.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.code === value?.code
                  }
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Box
                        key={key}
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...optionProps}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          srcSet={`https://flagcdn.com/w40/${option?.code.toLowerCase()}.png 2x`}
                          src={`https://flagcdn.com/w20/${option?.code.toLowerCase()}.png`}
                          alt=""
                        />
                        {option.name}
                      </Box>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputRef={ref}
                      label="Выберите страну"
                      error={!!error}
                      helperText={error?.message}
                      slotProps={{
                        htmlInput: {
                          ...params.inputProps,
                          autoComplete: "new-password",
                        },
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <FormInputText
              type="text"
              name="addressInfo.city"
              control={control}
              label="Город"
            />
          </Grid>

          <Grid size={12}>
            <FormInputText
              type="text"
              name="addressInfo.street"
              control={control}
              label="Улица"
            />
          </Grid>

          <Grid size={12}>
            <Controller
              name="addressInfo.index"
              control={control}
              render={({ field, fieldState }) => (
                <PatternFormat
                  format="##########"
                  name="addressInfo.index"
                  getInputRef={field.ref}
                  onBlur={field.onBlur}
                  label="Индекс"
                  value={field.value}
                  customInput={TextField}
                  size="small"
                  onValueChange={(value) => {
                    field.onChange(value.value);
                  }}
                  variant="outlined"
                  max={10}
                  min={5}
                  autoComplete="off"
                  fullWidth
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
export default AddressInfoForm;
