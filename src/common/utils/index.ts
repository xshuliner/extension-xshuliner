import type React from 'react';

export const stopEventDefault = (e: React.MouseEvent): void => {
  e.stopPropagation();
  e.preventDefault();
};
