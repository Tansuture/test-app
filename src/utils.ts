import dayjs from "dayjs";

export const getStoredData = () => {
  const storageData = localStorage.getItem('formData');
  if (!storageData) {
    return {
      personalInfo: { dateValue: dayjs() },
      financeInfo: {},
      addressInfo: {}
    };
  }

  const savedData = JSON.parse(storageData);
  return {
    personalInfo: {
      ...savedData.personalInfo,
      dateValue: dayjs(savedData.personalInfo?.dateValue)
    },
    financeInfo: savedData.financeInfo,
    addressInfo: savedData.addressInfo
  };
};
