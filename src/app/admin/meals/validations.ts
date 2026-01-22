import { filesValidations, numberValidation, selectOptionValidation, textValidation } from '@/_libs/validations';
import * as yup from 'yup';

const MealsValidations = yup
  .object({
    arName: textValidation.required('Arabic name is required'),
    enName: textValidation.required('English name is required'),
    price: numberValidation.required('Price is required'),
    arDescription: textValidation.required('Arabic description is required'),
    enDescription: textValidation.required('English description is required'),
    category: selectOptionValidation.required('Category is required'),
    image: filesValidations(['image/jpeg', 'image/png', 'image/jpg']).required('Category image is required'),
  })
  .required();

export { MealsValidations };