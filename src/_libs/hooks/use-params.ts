'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export const useParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const changeParams = (name: string, value: string | undefined | null, reset?: boolean) => {
    const _params = Object.fromEntries(searchParams.entries());

    if (!value) delete _params[name];

    if (value) Object.assign(_params, { [name]: value });

    if (!reset) {
      router.replace(`?${new URLSearchParams(_params)}`, {
        scroll: false,
      });
    }

    if (reset) {
      router.replace(`?${name}=${value}`, {
        scroll: false,
      });
    }
  };

  const getParam = (key: string) => searchParams.get(key);

  const removeParam = (key: string) => {
    const _params = Object.fromEntries(searchParams.entries());

    delete _params[key];

    router.replace(`?${new URLSearchParams(_params)}`, {
      scroll: false,
    });
  };

  return {
    params: Object.fromEntries(searchParams.entries()),
    changeParams,
    getParam,
    removeParam,
  };
};
