import dayjs from "dayjs";
import { FormTypes } from "./types/form-input-props";
import axios from "axios";
import { toast } from "react-toastify";

export const getStoredData = () => {
  const storageData = localStorage.getItem("formData");
  if (!storageData) {
    return {
      personalInfo: {},
      financeInfo: {},
      addressInfo: {},
    };
  }

  const savedData = JSON.parse(storageData);
  return {
    personalInfo: {
      ...savedData.personalInfo,
      dateValue: dayjs(savedData.personalInfo?.dateValue),
    },
    financeInfo: savedData.financeInfo,
    addressInfo: savedData.addressInfo,
  };
};

export const submitToFirebase = async (data: FormTypes) => {
  try {
    const response = await axios.post(
      "https://form-api-8224a-default-rtdb.firebaseio.com/submissions.json",
      data
    );
    localStorage.removeItem("formData");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error("Произошла ошибка при отправке. Попробуйте еще раз!");
    }
    throw new Error("Failed to submit form");
  }
};
