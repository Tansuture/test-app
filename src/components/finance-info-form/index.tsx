import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import {Box, Slider, SliderValueLabelProps, Tooltip, Typography} from "@mui/material";
import {FormInputText} from "../shared/text-field";
import Grid from "@mui/material/Grid2";
import {FormInputSlider} from "../shared/slider";
function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Index = () => {
  const {control,watch}=useFormContext()
  return (
      <>
        <Typography  variant='h5' align='center' fontWeight="bold">
         Финансовая  информация
        </Typography>

        <Box sx={{my:3}}>
          <Grid container spacing={2}>
            <Grid  size={12}>
          <FormInputText type="number" name="financeInfo.income" control={control} label="Ежемесячный доход" />
            </Grid>
            <Grid  size={12}>
              <FormInputSlider   max={200000} min={3}   name="financeInfo.amount" control={control} label="Сумма кредита"/>

            </Grid>
            <Grid  size={12}>
              <FormInputSlider   max={120} min={3}   name="financeInfo.term" control={control} label="Срок кредита"/>
            </Grid>
          </Grid>
        </Box>
        </>
  );
};

export default Index;