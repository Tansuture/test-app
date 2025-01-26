import { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import PersonalInfoForm from "../personal-info-form";
import { FormProvider, useForm } from "react-hook-form";
import { FormTypes } from "../../types/form-input-props";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./formSchema";
import AddressInfoForm from "../address-info-form";
import FinanceInfoForm from "../finance-info-form";
import { defaultValues, getStoredData, submitToFirebase } from "../../utils";
import {
  StyledSidebar,
  StyledStepLabel,
  StyledContent,
} from "../styled-components";
import { ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeStep, setActiveStep] = useState<number>(() => {
    const stepParam = searchParams.get("step");
    return stepParam ? parseInt(stepParam) : 0;
  });

  const methods = useForm<FormTypes>({
    mode: "onChange",
    resolver: yupResolver(formSchema()),
    defaultValues: getStoredData(),
  });
  const { handleSubmit, trigger, watch, reset } = methods;
  const formValues = watch();

  useEffect(() => {
    setSearchParams({ step: activeStep.toString() });
  }, [activeStep]);

  const onSubmit = async (value: FormTypes) => {
    setOpen(true);
    await submitToFirebase(value).then(() => {
      setOpen(false);
      localStorage.removeItem("formData");
      setActiveStep((prevStep) => prevStep + 1);
      reset(defaultValues);
    });
  };
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (activeStep === 2) {
        handleSubmit(onSubmit)();
      } else if (activeStep !== 3) {
        handleNextStep();
      }
    }
  };

  const steps = [
    { label: "Персональная информация", step: "Шаг 1 " },
    { label: "Адресная информация", step: "Шаг 2 " },
    { label: "Финансовая информация", step: "Шаг 3 " },
    { label: "Потверждение", step: "Шаг 4 " },
  ];
  const handleNextStep = async () => {
    let isStepValid = false;

    switch (activeStep) {
      case 0:
        isStepValid = await trigger([
          "personalInfo.name",
          "personalInfo.surName",
          "personalInfo.dateValue",
          "personalInfo.number",
          "personalInfo.email",
        ]);
        break;
      case 1:
        isStepValid = await trigger([
          "addressInfo.city",
          "addressInfo.country",
          "addressInfo.street",
          "addressInfo.index",
        ]);
        break;
      case 2:
        isStepValid = await trigger([
          "financeInfo.amount",
          "financeInfo.income",
          "financeInfo.term",
        ]);
        break;
      default:
        return;
    }

    if (isStepValid) {
      localStorage.setItem("formData", JSON.stringify(formValues));
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
              {steps.map((step) => (
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={handleKeyPress}
              >
                {activeStep === 0 && <PersonalInfoForm />}
                {activeStep === 1 && <AddressInfoForm />}
                {activeStep === 2 && <FinanceInfoForm />}
                {activeStep === 3 && (
                  <Box sx={{ my: 3 }}>
                    <Typography variant="h5" align="center" fontWeight="bold">
                      Ваша заявка отправлена
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      activeStep === 3 ? "center" : "space-between",
                  }}
                >
                  {activeStep !== 3 && (
                    <Button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((prevStep) => prevStep - 1)}
                      color="inherit"
                      sx={{ color: "text.secondary" }}
                    >
                      Назад
                    </Button>
                  )}
                  {activeStep === 2 ? (
                    <Button
                      type="submit"
                      // onClick={() => handleSubmit(onSubmit)}
                      variant="contained"
                      color="primary"
                    >
                      Потвердить
                    </Button>
                  ) : (
                    activeStep !== 3 && (
                      <Button
                        onClick={handleNextStep}
                        variant="contained"
                        color="primary"
                      >
                        Дальше
                      </Button>
                    )
                  )}
                  {activeStep === 3 && (
                    <Button
                      onClick={() => setActiveStep(0)}
                      variant="contained"
                      color="primary"
                    >
                      Вернуться на первый шаг
                    </Button>
                  )}
                </Box>
              </form>
            </FormProvider>
          </StyledContent>
        </Paper>
      </Box>
      <Backdrop
        sx={(theme) => ({ color: "primary", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Index;
