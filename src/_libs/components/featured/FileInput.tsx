'use client';

import { FC, useState } from 'react';

import { IGenericObject } from '@/_libs/types';

import { DropzoneInput, type DropzoneInputProps } from '../inputs/DropzoneInput';
import { useDelete, useCreate } from '../../api';

const FilesInput: FC<DropzoneInputProps> = ({ ...props }) => {
  const [deleteMediaId, setDeleteMediaId] = useState('');

  const { mutateAsync, isPending } = useCreate({
    url: props.uploadUrl ?? '',
    message: 'Uploaded successfully',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { mutateAsync: deleteFile, isPending: isDeleting } = useDelete({
    url: `${props?.deleteUrl}/${deleteMediaId}`,
    message: 'Deleted successfully',
  });

  return (
    <DropzoneInput
      {...props}
      isUploading={isPending}
      isDeleting={isDeleting}
      onUpload={async (files) => {
        const formData = new FormData();

        files.forEach((file: IGenericObject) => {
          if (file.file) {
            formData.append('File', file.file);
          }
        });

        if (formData.getAll('File').length === 0) {
          return;
        }

        await mutateAsync(formData);
      }}
      onDelete={async (id) => {
        setDeleteMediaId(id);

        await deleteFile(id);
      }}
    />
  );
};

export { FilesInput };
