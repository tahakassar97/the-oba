import * as yup from 'yup';

import {
  emailValidation,
  phoneValidation,
  selectOptionValidation,
  textValidation,
} from '@/_libs/validations';

const UsersValidations = yup
  .object({
    firstName: textValidation.required('First name is required'),
    lastName: textValidation.required('Last name is required'),
    email: emailValidation.required('Email is required'),
    phone: phoneValidation.required('Phone is required'),
    address: textValidation.required('Address is required'),
    role: selectOptionValidation.required('Role is required'),
  })
  .required();

export { UsersValidations };
