'use client';

import { FC } from 'react';
import { format } from 'date-fns';

import { Button, Icon } from '@/_libs/components';

interface BookingConfirmationProps {
  bookingData: {
    date: string;
    phoneNumber: string;
    notes?: string;
  } | null;
  onClose: () => void;
}

const BookingConfirmation: FC<BookingConfirmationProps> = ({ bookingData, onClose }) => {
  if (!bookingData) return null;

  const bookingDate = new Date(bookingData.date);
  const formattedDate = format(bookingDate, 'EEEE, MMMM dd, yyyy');
  const formattedTime = format(bookingDate, 'hh:mm a');

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in'>
        {/* Success Icon */}
        <div className='flex justify-center mb-6'>
          <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center'>
            <Icon name='check' size={40} color='#10b981' />
          </div>
        </div>

        {/* Title */}
        <h2 className='text-2xl font-bold text-gray-900 text-center mb-2'>Booking Confirmed!</h2>
        <p className='text-gray-600 text-center text-sm mb-6'>
          Your table reservation has been successfully placed
        </p>

        {/* Booking Details */}
        <div className='bg-gray-50 rounded-lg p-6 space-y-4 mb-6'>
          {/* Date */}
          <div className='flex items-start gap-4'>
            <div className='shrink-0'>
              <Icon name='calendar' size={20} color='#3B82F6' />
            </div>
            <div className='flex-1'>
              <p className='text-xs text-gray-600 font-semibold uppercase'>Date</p>
              <p className='text-gray-900 font-semibold'>{formattedDate}</p>
            </div>
          </div>

          {/* Time */}
          <div className='flex items-start gap-4'>
            <div className='shrink-0'>
              <Icon name='check' size={20} color='#8B5CF6' />
            </div>
            <div className='flex-1'>
              <p className='text-xs text-gray-600 font-semibold uppercase'>Time</p>
              <p className='text-gray-900 font-semibold'>{formattedTime}</p>
            </div>
          </div>

          {/* Phone */}
          <div className='flex items-start gap-4'>
            <div className='shrink-0'>
              <Icon name='phone' size={20} color='#EC4899' />
            </div>
            <div className='flex-1'>
              <p className='text-xs text-gray-600 font-semibold uppercase'>Contact Number</p>
              <p className='text-gray-900 font-semibold'>{bookingData.phoneNumber}</p>
            </div>
          </div>

          {/* Notes */}
          {bookingData.notes && (
            <div className='pt-4 border-t border-gray-200'>
              <p className='text-xs text-gray-600 font-semibold uppercase mb-2'>Additional Notes</p>
              <p className='text-gray-700 text-sm'>{bookingData.notes}</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
          <div className='flex items-start gap-3'>
            <Icon name='bell' size={16} color='#3B82F6' />
            <p className='text-xs text-blue-900'>
              We&lsquo;ll call you at the provided number to confirm your reservation. Please keep
              your phone available.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          type='button'
          className='w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200'
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
