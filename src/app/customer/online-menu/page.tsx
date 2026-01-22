'use client';

import { FC, useState } from 'react';

import {
  Button,
  DatePickerInput,
  Drawer,
  Form,
  Icon,
  Paragraph,
  SearchInput,
  TextAreaInput,
} from '@/_libs/components';
import { useParams } from '@/_libs/hooks';
import { IMeal } from '@/_libs/types';

import { MealDetailsDrawer } from '../(components)/MealDetailsDrawer';
import PlaceOrderDrawer from '../(components)/PlaceOrderDrawer';
import LanguageSwitcher from '../(components)/LanguageSwitcher';
import CategoriesList from '../(components)/CategoriesList';
import MealsList from '../(components)/MealsList';

const Menu: FC = () => {
  const [selectedItem, setSelectedItem] = useState<IMeal | null>(null);

  const { changeParams } = useParams();

  const onSelectItem = (item: IMeal) => {
    setSelectedItem(item);
    changeParams('item', item.id.toString(), true);
  };

  const minTime = new Date();
  minTime.setHours(9, 0, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  return (
    <div className='container mx-auto p-5 lg:p-8'>
      <MealDetailsDrawer item={selectedItem || null} />
      <PlaceOrderDrawer />

      <Paragraph className='text-5xl w-full text-center font-bold text-primary! mb-5'>
        The Oba Restaurant
      </Paragraph>

      <div className='flex gap-3 items-center w-full justify-end'>
        <LanguageSwitcher />

        <Drawer
          buttonProps={{
            label: (
              <div className='flex items-center gap-2'>
                <Icon name='calendar' size={14} />
                Reserve a Table
              </div>
            ),
            variant: 'secondary',
            className:
              'fixed lg:static bottom-2 text-white lg:left-0 lg:right-auto lg:-translate-x-0 left-1/2 -translate-x-1/2 transform z-20 rounded-full',
          }}
          title='Reserve a Table'
          className='w-full lg:w-[35vw]'
        >
          {() => {
            return (
              <Form className='space-y-4 pb-2' hideButton>
                <Paragraph className='text-sm text-gray-600 mt-3 mb-7'>
                  Choose your preferred date and time for a wonderful dining experience
                </Paragraph>
                <DatePickerInput
                  minTime={minTime}
                  maxTime={maxTime}
                  name='date'
                  label='Select Date'
                  showTimeSelect
                />
                <TextAreaInput name='notes' label='Additional Notes (Optional)' rows={5} />

                <Button type='submit' className='w-full'>
                  Reserve Table
                </Button>
              </Form>
            );
          }}
        </Drawer>
      </div>

      <CategoriesList />

      <div className='mt-3 px-2 lg:px-5'>
        <SearchInput placeholder='Search for a meal' />
        <MealsList onSelectItem={onSelectItem} hideActions />
      </div>
    </div>
  );
};

export default Menu;
