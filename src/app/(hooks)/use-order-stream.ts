'use client';

import { useEffect, useState } from 'react';
import { baseUrl } from '../../_libs/api/utils';

export const useOrderStream = () => {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'order_ready';
    userType: 'chef' | 'waiter';
  }>();

  const reset = () => {
    setNotification(undefined);
  };

  useEffect(() => {
    const es = new EventSource(`${baseUrl}/api/orders/stream`);

    es.addEventListener('order_ready', (event) => {
      const order = JSON.parse(event.data);

      setNotification({
        message: `New order ready, table ${order?.table?.number}`,
        type: 'order_ready',
        userType: 'waiter',
      });
    });

    es.onerror = () => {
      console.error('SSE connection error');
      es.close();
    };

    return () => es.close();
  }, []);

  return {
    notification, reset
  };
};