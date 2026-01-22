import { toast } from 'react-hot-toast';

interface Options {
  duration: number;
}

export const useToast = (id = 'default', options: Options = { duration: 4000 }) => {
  const errorNotify = (message: string) => {
    toast.error(message, {
      ...options,
      id,
      style: {
        backgroundColor: '#fee3e1',
        color: 'red',
      },
    });
  };

  const successNotify = (message: string) => {
    toast.success(message, {
      ...options,
      id,
      style: {
        backgroundColor: '#b6eacd',
        color: 'green',
      },
    });
  };

  const customNotify = (content: React.ReactNode) => {
    toast.custom((t) => {
      return (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white p-4 shadow-lg rounded-lg pointer-events-auto`}
        >
          {content}
        </div>
      );
    });
  };

  return { errorNotify, successNotify, customNotify };
};
