import * as Yup from "yup";
export const signUpValidationSchema = Yup.object().shape({
    userName: Yup.string().required('User name is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    middleName: Yup.string(), // Optional field
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Must be a number')
      .min(7, 'Phone number must be at least 7 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .positive('Age must be greater than zero')
      .required('Age is required'),
    sex: Yup.string().required('Sex is required'),
  });
  