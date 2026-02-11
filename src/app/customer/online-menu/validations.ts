import * as yup from 'yup';

import { dateValidation, phoneValidation } from '@/_libs/validations';

const BookingValidations = yup
  .object({
    date: dateValidation.required('Date is required'),
    time: dateValidation.required('Time is required'),
    phoneNumber: phoneValidation.required('Phone number is required'),
  })
  .required();

export { BookingValidations };