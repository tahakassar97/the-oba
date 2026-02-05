import * as yup from 'yup';

import { emailValidation, passwordValidation } from '@/_libs/validations';

const LoginValidations = yup
  .object({
    email: emailValidation.required('Email is required'),
    password: passwordValidation.required('Password is required'),
  })
  .required();

export { LoginValidations };