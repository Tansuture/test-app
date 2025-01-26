export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  type?: string;
  max?: number;
  min?: number;
  defaultValue?: number;
}

export interface PersonalInfo {
  name: string;
  surName: string;
  dateValue: string;
  email: string;
  number: string;
}
export interface FormTypes {
  personalInfo: {
    name: string;
    surName: string;
    dateValue: string;
    email: string;
    number: string;
  };
  addressInfo: {
    city: string;
    country: string;
    street: string;
    index: string;
  };
  financeInfo: {
    income: string;
    amount: string;
    term: string;
  };
}
