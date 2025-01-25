import {mixed, object, ObjectSchema, string} from "yup";

export const formSchema = (): ObjectSchema<any> =>object().shape({
  personalInfo:object().shape({
    name:string().required('Поле обязательное'),
    surName:string().required('Поле обязательное'),
    dateValue:string().required('Поле обязательное'),
    email:string().email().required('Поле обязательное'),
    number:string().required('Поле обязательное')
  }),
  addressInfo:object().shape({
    city:string().required('Поле обязательное'),
    country:mixed().required('Поле обязательное'),
    street:string().required('Поле обязательное'),
    index:string().required('Поле обязательное')
  }),
  financeInfo:object().shape({
    income:string().required('Поле обязательное'),
    amount:string().required('Поле обязательное'),
    term:string().required('Поле обязательное'),
  })
})