'use client';

import { FC, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Button, Link, Icon, IconName, cn, AppImage } from '@/_libs/components';
import { useScrollLock } from '@/_libs/hooks';

const SidebarItem = ({ href, icon, label }: { href: string; icon: IconName; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Link href={href}>
      <div
        className={`
          group cursor-pointer relative flex items-center space-x-3 rounded-lg 
          transition-300
          ${
            isActive
              ? 'text-secondary'
              : 'text-gray-700 hover:shadow-xs hover:translate-x-1 hover:scale-105'
          } 
          transform will-change-transform
        `}
      >
        <div
          className={`
          p-2 rounded-lg transition-300 
          ${
            isActive
              ? 'bg-secondary/20'
              : 'bg-gray-100 group-hover:bg-secondary/20 group-hover:scale-110'
          } 
          transform will-change-transform
        `}
        >
          <Icon
            name={icon}
            className={`
            w-5 h-5 transition-all duration-300 
            ${
              isActive
                ? 'text-secondary'
                : 'text-gray-500 group-hover:text-secondary group-hover:rotate-6'
            }
          `}
          />
        </div>
        <span
          className={`
          text-[10px] lg:text-sm font-medium transition-colors 
          ${isActive ? 'text-secondary' : 'text-gray-700 group-hover:text-secondary group-hover:pl-1'}
        `}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useScrollLock(isOpen);

  return (
    <>
      <aside
        className={cn(
          'fixed top-0 flex flex-col justify-between py-2 bg-white shadow-sm border-r border-secondary/20 px-3 space-y-4 z-30 h-full transition-300',
          isOpen ? 'w-72 lg:left-0 lg:w-72' : 'w-0 lg:w-72 -left-11 lg:left-0',
        )}
      >
        <div>
          <div className='absolute top-0 left-0 w-full h-1 bg-linear-to-r from-secondary to-secondary/50'></div>

          <div className='relative lg:hidden'>
            <div
              className={cn(
                'flex items-center justify-center absolute top-5 z-20 w-8 h-8 bg-primary/30 rounded-full',
                {
                  '-right-20': !isOpen,
                  'right-0': isOpen,
                },
              )}
            >
              <Button onClick={() => setIsOpen(!isOpen)} variant='link'>
                <Icon name={isOpen ? 'arrowLeft' : 'arrowRight'} size={15} />
              </Button>
            </div>
          </div>

          <div className='flex items-center justify-center mt-3'>
            <AppImage src='/images/logo.jpg' alt='logo' width={80} height={80} />
          </div>

          <nav className='flex flex-col gap-y-4 py-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-20rem)] thin-scroll px-3'>
            <SidebarItem href='/admin/dashboard' icon='home' label='Dashboard' />
            <SidebarItem href='/admin/orders' icon='shoppingBasket' label='Orders' />
            <SidebarItem href='/admin/meals' icon='tag' label='Meals' />
            <SidebarItem href='/admin/tables' icon='grid3x3' label='Tables' />
            <SidebarItem href='/admin/categories' icon='menu' label='Categories' />
          </nav>
        </div>

        {/* <div className='px-2 lg:px-6 lg:flex hidden'>
          <div className='bg-linear-to-br w-full from-secondary/20 to-secondary/50 rounded-lg lg:p-4 p-2 text-center shadow-md'>
            <div className='mb-2 flex justify-center'>
              <div className='bg-white p-2 rounded-full shadow-sm'>
                <Icon name='calendar' className='h-5 w-5 text-secondary' />
              </div>
            </div>
            <Paragraph
              variant='small'
              textColor='secondary'
              className='mb-2 font-bold text-gray-800 text-sm'
            >
              Quick Actions
            </Paragraph>
            <div className='flex flex-col gap-y-1.5 mb-2'>
              <Link href='/admin/services/create'>
                <Button
                  className='bg-white/50 rounded-md p-2 flex items-center w-full justify-between hover:bg-white/70 text-secondary hover:text-secondary transition-all'
                  variant='link'
                  size='sm'
                >
                  <span className='flex items-center gap-2'>
                    <Icon name='plus' className='text-secondary' />
                    Add Service
                  </span>
                  <Icon name='chevronRight' className='text-secondary' />
                </Button>
              </Link>

              <Link href='/admin/employees/create'>
                <Button
                  className='bg-white/50 rounded-md p-2 flex items-center w-full  justify-between hover:bg-white/70 text-secondary hover:text-secondary transition-all'
                  variant='link'
                  size='sm'
                >
                  <span className='flex items-center gap-2'>
                    <Icon name='plus' className='text-secondary' />
                    Add Employee
                  </span>
                  <Icon name='chevronRight' className='text-secondary' />
                </Button>
              </Link>
            </div>
          </div>
        </div> */}
      </aside>
      {isOpen && (
        <div
          className='fixed transition-300 inset-0 bg-black/50 z-10'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

// interface GroupProps {
//   children: React.ReactNode;
//   title: string;
// }

// const Group: FC<GroupProps> = ({ children, title }) => {
//   return (
//     <div className="my-2">
//       <Paragraph variant="small" textColor="primary">
//         {title}
//       </Paragraph>
//       <div className="px-2 flex flex-col gap-y-2.5 mt-2.5">{children}</div>
//     </div>
//   );
// };
