'use client';

import { useState } from 'react';

const useFocus = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return { isFocused, handleFocus, handleBlur };
};

export { useFocus };
