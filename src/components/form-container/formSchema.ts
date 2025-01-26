import { mixed, number, object, ObjectSchema, string } from "yup";

export const formSchema = (): ObjectSchema<any> =>
  object().shape({
    personalInfo: object().shape({
      name: string().required("Поле обязательное"),
      surName: string().required("Поле обязательное"),
      dateValue: string().required("Поле обязательное"),
      email: string()
        .email("Неверный формат email")
        .required("Поле обязательное"),
      number: string()
        .required("Поле обязательное")
        .min(10, "Номер телефона должен соблюдать 11 чисел")
        .max(10, "Номер телефона должен соблюдать 1 чисел"),
    }),
    addressInfo: object().shape({
      city: string().required("Поле обязательное"),
      country: mixed().required("Поле обязательное"),
      street: string().required("Поле обязательное"),
      index: string()
        .required("Поле обязательное")
        .min(5, "Индекс должен соблюдать минимум 5 чисел")
        .max(10, "Индекс должен соблюдать минимум 10 чисел"),
    }),
    financeInfo: object().shape({
      income: string().required("Поле обязательное"),
      amount: number().required("Поле обязательное"),
      term: number().required("Поле обязательное"),
    }),
  });
