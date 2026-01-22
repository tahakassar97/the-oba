import { Toaster } from 'react-hot-toast';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster
        containerStyle={{
          padding: '20px 0',
        }}
      />
      {children}
    </>
  );
};
