import { filesValidations, textValidation } from '@/_libs/validations';
import * as yup from 'yup';

const CategoriesValidations = yup
  .object({
    arName: textValidation.required('Arabic name is required'),
    enName: textValidation.required('English name is required'),
    image: filesValidations(['image/jpeg', 'image/png', 'image/jpg']).required('Category image is required'),
  })
  .required();

export { CategoriesValidations };