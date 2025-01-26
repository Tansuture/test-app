import { useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { FormInputText } from "../shared/text-field";
import Grid from "@mui/material/Grid2";
import { FormInputSlider } from "../shared/slider";
const Index = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="h5" align="center" fontWeight="bold">
        Финансовая информация
      </Typography>

      <Box sx={{ my: 3 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <FormInputText
              type="number"
              name="financeInfo.income"
              control={control}
              label="Ежемесячный доход"
            />
          </Grid>
          <Grid size={12}>
            <FormInputSlider
              max={1000000}
              min={20000}
              defaultValue={20000}
              name="financeInfo.amount"
              control={control}
              label="Сумма кредита"
            />
          </Grid>
          <Grid size={12}>
            <FormInputSlider
              max={120}
              min={3}
              defaultValue={3}
              name="financeInfo.term"
              control={control}
              label="Срок кредита(мес)"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Index;
