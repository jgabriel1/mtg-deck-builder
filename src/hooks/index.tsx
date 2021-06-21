import { FC } from 'react';

import { DeckProvider } from './deck';
import { ListOptionsProvider } from './listOptions';

export const AppProvider: FC = ({ children }) => {
  return (
    <DeckProvider>
      <ListOptionsProvider></ListOptionsProvider>
      {children}
    </DeckProvider>
  );
};
