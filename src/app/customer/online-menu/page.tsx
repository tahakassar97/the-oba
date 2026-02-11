'use client';

import { FC, useState } from 'react';

import {
  DatePickerInput,
  Drawer,
  Form,
  Icon,
  Paragraph,
  SearchInput,
  TextAreaInput,
  TextInput,
} from '@/_libs/components';
import { useDate, useParams } from '@/_libs/hooks';
import { IGenericObject, IMeal } from '@/_libs/types';

import { MealDetailsDrawer } from '../(components)/MealDetailsDrawer';
import PlaceOrderDrawer from '../(components)/PlaceOrderDrawer';
import LanguageSwitcher from '../(components)/LanguageSwitcher';
import CategoriesList from '../(components)/CategoriesList';
import MealsList from '../(components)/MealsList';
import BookingConfirmation from '../(components)/BookingConfirmation';
import { BookingValidations } from './validations';
import { Create } from '@/_libs/api';

const Menu: FC = () => {
  const [selectedItem, setSelectedItem] = useState<IMeal | null>(null);
  const [bookingData, setBookingData] = useState<{
    date: string;
    phoneNumber: string;
    notes?: string;
  } | null>(null);

  const { changeParams } = useParams();
  const { combineDateTime } = useDate();

  const onSelectItem = (item: IMeal) => {
    setSelectedItem(item);
    changeParams('item', item.id.toString(), true);
  };

  const minTime = new Date();
  minTime.setHours(9, 0, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  const transformBody = (body: IGenericObject) => {
    const date = combineDateTime(new Date(), body.time);

    return {
      notes: body.notes,
      customerPhone: body.phoneNumber,
      date,
    };
  };

  const handleBookingSuccess = (formData: IGenericObject) => {
    setBookingData({
      date: formData?.date || '',
      phoneNumber: formData?.customerPhone || '',
      notes: formData?.notes || '',
    });
  };

  return (
    <div className='container mx-auto p-5 lg:p-8'>
      <MealDetailsDrawer item={selectedItem || null} />

      <PlaceOrderDrawer />

      <BookingConfirmation bookingData={bookingData} onClose={() => setBookingData(null)} />

      <Paragraph className='text-2xl lg:text-5xl w-full text-center font-bold text-primary! mb-5'>
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
          {({ close }) => {
            return (
              <Create
                url='bookings'
                transformBody={transformBody}
                onSuccess={(response) => {
                  close();
                  handleBookingSuccess(response);
                }}
              >
                <Form
                  buttonProps={{
                    title: 'Reserve Table',
                  }}
                  className='space-y-4 pb-2'
                  schema={BookingValidations}
                >
                  <Paragraph className='text-sm text-gray-600 mt-3 mb-7'>
                    Choose your preferred date and time for a wonderful dining experience
                  </Paragraph>
                  <DatePickerInput
                    minTime={minTime}
                    maxTime={maxTime}
                    name='date'
                    label='Select Date'
                  />
                  <DatePickerInput
                    minTime={minTime}
                    maxTime={maxTime}
                    name='time'
                    label='Select Time'
                    showTimeSelect
                    showDateSelect={false}
                    showTimeSelectOnly
                  />
                  <TextInput label='Phone Number' name='phoneNumber' />
                  <TextAreaInput name='notes' label='Additional Notes (Optional)' rows={5} />
                </Form>
              </Create>
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
