/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

export const validationInstance = yup;

export type ValidationSchema<T = any> = yup.Schema<T>;

export const textValidation = validationInstance.string().trim();

export const emailValidation = validationInstance.string().trim().email();

export const passwordValidation = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
  .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
  .matches(/(?=.*\d)/, 'Password must contain at least one number')
  .matches(/^[^\s]*$/, 'Password cannot contain spaces');

export const confirmPasswordValidation = validationInstance
  .string()
  .trim()
  .oneOf([validationInstance.ref('password')], 'Passwords must match');

export const phoneValidation = validationInstance
  .string()
  .trim()
  .matches(/^\+?[1-9]\d{7,14}$/);

export const numberValidation = validationInstance.number().min(0);

export const selectOptionValidation = validationInstance.object({
  value: validationInstance.mixed().required('Please select an option'),
  label: validationInstance.string().required('Please select a valid option'),
});

export const selectValidation = validationInstance
  .mixed()
  .test('is-valid-select-option', 'Please select a valid option', (value) => {
    if (!value) return false;

    if (Array.isArray(value)) {
      if (value.length === 0) return false;

      return value.every(
        (v) =>
          v &&
          typeof v === 'object' &&
          'value' in v &&
          'label' in v &&
          typeof v.value !== 'undefined' &&
          typeof v.label === 'string',
      );
    }
    return (
      value &&
      typeof value === 'object' &&
      'value' in value &&
      'label' in value &&
      typeof value.value !== 'undefined' &&
      typeof value.label === 'string'
    );
  });

export const fileSizeValidation = (maxSize: number) =>
  validationInstance
    .mixed<File>()
    .test('file-size', `File size must be less than ${maxSize / 1024 / 1024}MB`, (value) => {
      if (!value) return true;
      return value.size <= maxSize;
    });

// Combined File Validation Schema
export const filesValidations = (allowedTypes?: string[]) =>
  validationInstance
    .mixed<File[] | File | string[] | string>()
    .required('Please upload a file')
    .test('files-validations', 'Please upload valid file(s)', (value: File | File[] | string | string[] | null) => {
      if (!value) return false;

      if (Array.isArray(value)) {
        if (value.length === 0) return false;

        return value.every((item) => typeof item === 'object' || typeof item === 'string');
      }

      return typeof value === 'object' || typeof value === 'string';
    })
    .test(
      'file-type',
      `Only ${allowedTypes?.join(', ')} files are allowed`,
      (value: File | File[] | string | string[] | null) => {
        if (!allowedTypes?.length) return true;

        if (!value) return false;

        if (Array.isArray(value)) {
          if (value.length === 0) return false;

          return value.every((item) => {
            // If it's a string (URL), skip type validation
            if (typeof item === 'string') return true;

            const fileType = item.type.toLowerCase();
            return allowedTypes?.some((type) => fileType.includes(type.toLowerCase()));
          });
        }

        // If it's a string (URL), skip type validation
        if (typeof value === 'string') return true;

        const fileType = value.type.toLowerCase();
        return allowedTypes?.some((type) => fileType.includes(type.toLowerCase()));
      },
    );

