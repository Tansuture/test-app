import { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Paper,
  Modal,
  Dialog,
  DialogContent,
} from "@mui/material";
import PersonalInfoForm from "../personal-info-form";
import { FormProvider, useForm } from "react-hook-form";
import { FormTypes } from "../../types/form-input-props";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./formSchema";
import AddressInfoForm from "../address-info-form";
import FinanceInfoForm from "../finance-info-form";
import { getStoredData, submitToFirebase } from "../../utils";
import {
  StyledSidebar,
  StyledStepLabel,
  StyledContent,
} from "../styled-components";
import { ToastContainer } from "react-toastify";

const Index = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isConfirmOpen, setIsOpenConfirm] = useState<boolean>(false);

  const methods = useForm<FormTypes>({
    mode: "onChange",
    resolver: yupResolver(formSchema()),
    defaultValues: getStoredData(),
  });
  const {
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = methods;
  const formValues = watch();
  console.log(errors);

  const onSubmit = async (value: FormTypes) => {
    try {
      await submitToFirebase(value);
      setActiveStep(0);
      setIsOpenConfirm(!isConfirmOpen);
      reset();
    } catch (error) {}
  };

  const steps = [
    { label: "Персональная информация", step: "Шаг 1 " },
    { label: "Адресня информация", step: "Шаг 2 " },
    { label: "Финансовая информация", step: "Шаг 3 " },
    { label: "Потверждение", step: "Шаг 4 " },
  ];
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formValues));
  }, [formValues]);

  const handleNextStep = async () => {
    let isStepValid = false;

    switch (activeStep) {
      case 0:
        isStepValid = await trigger("personalInfo", { shouldFocus: true });
        break;
      case 1:
        isStepValid = await trigger("addressInfo", { shouldFocus: true });
        break;
      case 2:
        const financeValid = await trigger("financeInfo", {
          shouldFocus: true,
        });
        if (financeValid) {
          handleSubmit(onSubmit)();
          return;
        }
        isStepValid = financeValid;
        break;
    }

    if (isStepValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#F3F4F6",
          p: 3,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: 900,
            width: "100%",
            boxShadow: 3,
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <StyledSidebar>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              sx={{
                "& .MuiStepConnector-root": {
                  marginLeft: "18px",
                },
                "& .MuiStepConnector-line": {
                  borderColor: "rgba(255,255,255,0.3)",
                  minHeight: "80px",
                },
              }}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    <StyledStepLabel>{step.step}</StyledStepLabel>

                    <Typography sx={{ color: "white" }}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </StyledSidebar>

          <StyledContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {activeStep === 0 && <PersonalInfoForm />}
                {activeStep === 1 && <AddressInfoForm />}
                {activeStep === 2 && <FinanceInfoForm />}
                {activeStep === 3 && (
                  <Box sx={{ my: 3 }}>
                    <Typography variant="h5" align="center" fontWeight="bold">
                      Вы готовы отправить заявку?
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prevStep) => prevStep - 1)}
                    color="inherit"
                    sx={{ color: "text.secondary" }}
                  >
                    Назад
                  </Button>
                  {activeStep === 3 ? (
                    <Button type="submit" variant="contained" color="primary">
                      Потвердить
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextStep}
                      variant="contained"
                      color="primary"
                    >
                      Дальше
                    </Button>
                  )}
                </Box>
              </form>
            </FormProvider>
          </StyledContent>
        </Paper>
      </Box>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsOpenConfirm(!isConfirmOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ваша заявка отправлена!
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
