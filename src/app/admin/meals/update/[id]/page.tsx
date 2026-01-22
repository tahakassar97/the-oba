'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { GetOne, SelectList, Update } from '@/_libs/api';
import {
  Button,
  DropzoneInput,
  Form,
  Icon,
  Link,
  NumberInput,
  Paragraph,
  SelectInput,
  TextAreaInput,
  TextInput,
  ToggleInput,
} from '@/_libs/components';
import { IGenericObject } from '@/_libs/types';

import PageHead from '../../../_layouts/PageHead';

const UpdateMeal: FC = () => {
  const { back } = useRouter();

  const transformBody = (body: IGenericObject) => {
    const formData = new FormData();
    formData.append('arName', body.arName);
    formData.append('enName', body.enName);
    formData.append('arDescription', body.arDescription);
    formData.append('enDescription', body.enDescription);
    formData.append('price', body.price);
    formData.append('isAvailable', body.isAvailable);
    formData.append('categoryId', body.categories.value);

    if (body.image && body.image?.file instanceof File) {
      formData.append('image', body.image?.file);
    }

    return formData;
  };

  return (
    <GetOne url='meals'>
      {(data) => {
        return (
          <>
            <PageHead title='Update Meal'>
              <Link href='/admin/meals'>
                <Button
                  variant='outline'
                  className='flex gap-1.5 rounded-full px-3 text-primary py-2 border-primary/30 hover:bg-primary/5 text-sm shadow'
                  size='sm'
                >
                  <Icon name='arrowLeft' size={16} className='text-primary' /> Back
                </Button>
              </Link>
            </PageHead>

            <Update
              url='meals'
              transformBody={transformBody}
              message='Meal Updated Successfully!'
              onSuccess={back}
              data={data}
            >
              <Form className='flex flex-wrap gap-4 lg:p-5 shadow rounded-md bg-white'>
                <Paragraph className='mb-1 font-semibold w-full underline'>
                  Basic Information
                </Paragraph>
                <TextInput
                  label='Arabic Name'
                  name='arName'
                  required
                  containerClassName='w-[32%]'
                />
                <TextInput
                  label='English Name'
                  name='enName'
                  required
                  containerClassName='w-[32%]'
                />
                <NumberInput label='Price' name='price' required containerClassName='w-[32%]' />

                <Paragraph className='mb-1 mt-5 font-semibold w-full underline'>
                  Description
                </Paragraph>

                <div className='flex gap-2 lg:gap-5 lg:flex-nowrap flex-wrap w-full'>
                  <TextAreaInput
                    label='Arabic Description'
                    name='arDescription'
                    required
                    rows={5}
                    containerClassName='w-[48%]'
                  />
                  <TextAreaInput
                    label='English Description'
                    name='enDescription'
                    required
                    rows={5}
                    containerClassName='w-[48%]'
                  />
                </div>

                <div className='flex lg:flex-nowrap flex-wrap gap-2 justify-between lg:gap-5 w-full'>
                  <span className='flex flex-col w-1/3'>
                    <Paragraph className='mb-4 mt-5 font-semibold w-full underline'>
                      Category
                    </Paragraph>

                    <SelectList url='categories?limit=100' enableSearch={false}>
                      <SelectInput
                        optionLabel='enName'
                        optionValue='id'
                        label='Category'
                        name='categories'
                        required
                        defaultValue={{
                          label: data?.category.enName,
                          value: data?.category.id,
                        }}
                        containerClassName='w-full'
                      />
                    </SelectList>
                  </span>

                  <span className='1/3'>
                    <Paragraph className='mb-4 mt-5 font-semibold w-full underline'>
                      Image
                    </Paragraph>

                    <DropzoneInput label='Meal Image' name='image' containerClassName='w-96' />
                  </span>

                  <span className='1/3'>
                    <Paragraph className='mb-4 mt-5 font-semibold w-full underline'>
                      Availability
                    </Paragraph>

                    <ToggleInput name='isAvailable' rightLabel='Available' />
                  </span>
                </div>
              </Form>
            </Update>
          </>
        );
      }}
    </GetOne>
  );
};

export default UpdateMeal;
