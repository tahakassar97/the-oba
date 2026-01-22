import { FC } from 'react';

import { Drawer, DropzoneInput, Form, TextInput } from '@/_libs/components';
import { IGenericObject } from '@/_libs/types';

import { CategoriesValidations } from './validations';
import { Create } from '@/_libs/api';

const CreateCategoryDrawer: FC = () => {
  const transformBody = (body: IGenericObject) => {
    const formData = new FormData();
    formData.append('arName', body.arName);
    formData.append('enName', body.enName);

    if (body.image && body.image instanceof File) {
      formData.append('image', body.image);
    }

    return formData;
  };

  return (
    <Drawer
      buttonProps={{
        label: '+ Create Category',
        variant: 'primary',
      }}
      drawerKey='create-category'
      drawerValue='create-category'
    >
      {({ toggle }) => (
        <div>
          <div className='mb-4 text-2xl font-semibold text-primary'>Create Category</div>

          <Create
            url='categories'
            message='Category Created Successfully!'
            transformBody={transformBody}
            onSuccess={toggle}
          >
            <Form className='p-3 border border-gray-200 rounded-md' schema={CategoriesValidations}>
              <TextInput label='Arabic Name' name='arName' required className='mb-4' />
              <TextInput label='English Name' name='enName' required className='mb-4' />
              <DropzoneInput label='Category Image' name='image' required />
            </Form>
          </Create>
        </div>
      )}
    </Drawer>
  );
};

export { CreateCategoryDrawer };
