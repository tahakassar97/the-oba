'use client';

import { FC } from 'react';

import { Icon, IconName, Link } from '@/_libs/components';
import PageHead from '../_layouts/PageHead';

const Settings: FC = () => {
  const navigationItems = [
    {
      id: 'online-menu',
      title: 'Online Menu',
      description: 'Manage your online menu and customer experience',
      icon: 'globe',
      href: 'https://the-oba.vercel.app/customer/online-menu',
      color: 'from-primary/70 to-primary/90',
      iconColor: '#3B82F6',
    },
    {
      id: 'menu',
      title: 'Restaurant Menu',
      description: 'Manage your restaurant menu',
      icon: 'menu',
      href: 'https://the-oba.vercel.app/customer/menu',
      color: 'from-secondary/70 to-secondary/90',
      iconColor: '#F97316',
    },
  ];

  return (
    <>
      <PageHead title='Settings' />

      <div className='space-y-6 bg-white rounded-2xl border border-gray-200 p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {navigationItems.map((item) => (
            <Link key={item.id} href={item.href} className='group'>
              <div className='h-full bg-white rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden'>
                {/* Gradient header */}
                <div
                  className={`bg-linear-to-r ${item.color} p-6 flex items-center justify-between`}
                >
                  <div>
                    <h3 className='text-xl font-bold text-white'>{item.title}</h3>
                    <p className='text-white/80 text-sm mt-1'>{item.description}</p>
                  </div>
                  <div className='shrink-0 bg-white/20 rounded-lg p-3 group-hover:bg-white/30 transition-colors'>
                    <Icon name={item.icon as IconName} size={24} color='white' />
                  </div>
                </div>

                {/* Footer with arrow */}
                <div className='px-6 py-4 flex items-center justify-between bg-gray-50 group-hover:bg-gray-100 transition-colors'>
                  <span className='text-sm font-semibold text-gray-600 group-hover:text-gray-900'>
                    Go to {item.title}
                  </span>
                  <Icon
                    name='arrowRight'
                    size={20}
                    color='#666'
                    className='group-hover:translate-x-1 transition-transform'
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info section */}
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8'>
          <div className='flex items-start gap-4'>
            <div className='shrink-0 mt-1'>
              <Icon name='bell' size={24} color='#3B82F6' />
            </div>
            <div>
              <h4 className='font-semibold text-gray-900'>Quick Access</h4>
              <p className='text-gray-700 text-sm mt-1'>
                Use the cards above to quickly navigate to different parts of your restaurant
                management system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
