import { FC } from 'react';

import { Drawer, DropzoneInput, Form, Icon, TextInput } from '@/_libs/components';
import { IGenericObject } from '@/_libs/types';
import { GetOne, Update } from '@/_libs/api';

import { CategoriesValidations } from './validations';

const UpdateCategoryDrawer: FC<{ id: string }> = ({ id }) => {
  const transformBody = (body: IGenericObject) => {
    const formData = new FormData();
    formData.append('arName', body.arName);
    formData.append('enName', body.enName);

    console.log(body);

    if (body.image && body.image?.file instanceof File) {
      formData.append('image', body.image?.file);
    }

    return formData;
  };

  return (
    <Drawer
      buttonProps={{
        label: <Icon name='edit' className='w-5 h-5' />,
        variant: 'link',
      }}
      drawerKey='update-category'
      drawerValue={id.toString()}
      title='Update Category'
    >
      {({ toggle }) => (
        <>
          <GetOne url='categories' id={id}>
            <Update
              url='categories'
              message='Category Updated Successfully!'
              id={id}
              transformBody={transformBody}
              onSuccess={toggle}
            >
              <Form
                className='p-3 border border-gray-200 rounded-md'
                schema={CategoriesValidations}
              >
                <TextInput label='Arabic Name' name='arName' required className='mb-4' />
                <TextInput label='English Name' name='enName' required className='mb-4' />
                <DropzoneInput label='Category Image' name='image' required />
              </Form>
            </Update>
          </GetOne>
        </>
      )}
    </Drawer>
  );
};

export { UpdateCategoryDrawer };
