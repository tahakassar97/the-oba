import * as yup from 'yup';

import { dateValidation } from '@/_libs/validations';

const BookingValidations = yup
  .object({
    date: dateValidation.required('Date Time is required'),
  })
  .required();

export { BookingValidations };