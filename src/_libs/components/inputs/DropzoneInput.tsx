'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Dropzone, ExtFile, FileMosaic } from '@dropzone-ui/react';

import { Label } from './Label';
import { InputProps } from './IProps';
import { ErrorMessage } from './ErrorMessage';
import { IGenericObject } from '../../types';
import { cn } from '../utils';

export interface DropzoneInputProps extends InputProps {
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  urlKey?: string; // Key for URL property in media object
  idKey?: string; // Key for ID property in media object
  baseUrl?: string;
  uploadUrl?: string;
  deleteUrl?: string;
  isUploading?: boolean;
  isDeleting?: boolean;
  onUpload?: (files: ExtFile[]) => void;
  onDelete?: (id: string) => Promise<void>;
}

export const DropzoneInput = forwardRef<HTMLDivElement, DropzoneInputProps>(
  (
    {
      name,
      label,
      accept = 'image/*, video/*',
      maxFiles = 5,
      maxSize = 5 * 1024 * 1024,
      multiple = false,
      containerClassName,
      urlKey = 'Url',
      idKey = 'Id',
      baseUrl,
      isUploading,
      isDeleting,
      onUpload,
      onDelete: _onDelete,
      ...props
    },
    ref,
  ) => {
    const {
      control,
      setValue,
      getValues,
      formState: { errors },
    } = useFormContext();

    const [files, setFiles] = useState<ExtFile[]>([]);

    useEffect(() => {
      const existingFiles = getValues(name);
      if (!existingFiles) return;

      const fileArray = Array.isArray(existingFiles) ? existingFiles : [existingFiles];

      const mappedFiles = fileArray.map((file: IGenericObject) => {
        if (file?.[urlKey]) {
          return {
            id: file[idKey] || file[urlKey],
            name: file.name || 'Existing File',
            imageUrl: baseUrl ? `${baseUrl}${file[urlKey]}` : file[urlKey],
            type: 'image',
          };
        }

        if (typeof file === 'string') {
          return {
            id: file,
            name: 'Existing File',
            imageUrl: baseUrl ? `${baseUrl}${file}` : file,
            type: 'image',
          };
        }

        return file;
      });

      setFiles(mappedFiles);
    }, [getValues, name, urlKey, idKey, baseUrl]);

    const handleChange = (newFiles: ExtFile[]) => {
      const result = multiple ? newFiles : newFiles[0];

      setFiles([result]);

      setValue(name, result);
    };

    const onDelete = async (index: number) => {
      if (!files || index >= files.length) return;

      const fileToDelete = files[index];
      const updatedFiles = files.filter((_, i) => i !== index);

      if (fileToDelete?.id && !fileToDelete?.file) {
        await _onDelete?.(fileToDelete.id.toString());
      }

      setFiles(updatedFiles);
      setValue(name, multiple ? updatedFiles : updatedFiles[0] || undefined);
    };

    const hasError = Boolean(errors[name]);

    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        <div ref={ref} className='relative h-full mt-1'>
          <Label
            className='absolute left-3 -top-2 bg-white z-10 px-1 text-xs text-primary'
            name={name}
            label={label}
            isLabelUp
          />

          <Controller
            name={name}
            control={control}
            defaultValue={multiple ? [] : undefined}
            disabled={props.disabled}
            render={({ field: { onBlur } }) => (
              <Dropzone
                value={files}
                onChange={handleChange}
                onBlur={onBlur}
                maxFiles={maxFiles}
                maxFileSize={maxSize}
                accept={accept}
                header={false}
                multiple={multiple}
                disabled={props.disabled}
                footer={false}
                uploadConfig={{
                  uploadingMessage: 'Uploading...',
                  uploadLabel: 'Upload',
                }}
                actionButtons={{
                  position: 'after',
                  uploadButton: props.uploadUrl
                    ? {
                        className:
                          'underline mb-4 px-1 font-bold !bg-transparent !text-primary !ring-1 !ring-primary/50',
                        onClick: () => {
                          if (props.uploadUrl) {
                            return onUpload?.(files);
                          }
                          return null;
                        },
                        disabled: !!isUploading,
                        children: isUploading ? 'Uploading...' : 'Upload',
                      }
                    : undefined,
                }}
                label={props.placeholder}
                className={cn(
                  'border border-primary/80 border-solid rounded-md',
                  hasError ? 'border-red-500' : '',
                  props.className,
                )}
              >
                {files.map((file, index) => (
                  <FileMosaic
                    key={index}
                    {...file}
                    preview
                    info
                    uploadStatus={isDeleting ? 'preparing' : undefined}
                    style={{
                      border: '1px dashed #ccc',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontFamily: 'inherit',
                    }}
                    onDelete={() => onDelete(index)}
                    resultOnTooltip
                    alwaysActive
                    className='my-2 rounded-lg'
                  />
                ))}
              </Dropzone>
            )}
          />
        </div>
        <ErrorMessage name={name} />
      </div>
    );
  },
);

DropzoneInput.displayName = 'DropzoneInput';
