import * as yup from 'yup';

import { selectOptionValidation } from '@/_libs/validations';

const PlaceOrderValidation = yup
  .object({
    table: selectOptionValidation.required('Table is required'),
  })
  .required();

export { PlaceOrderValidation };