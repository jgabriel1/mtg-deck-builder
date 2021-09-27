import { FC } from 'react';
import { DeckProvider } from './deck';
import { ListOptionsProvider } from './listOptions';
import { PricesProvider } from './prices';

export const AppProvider: FC = ({ children }) => {
  return (
    <DeckProvider>
      <PricesProvider>
        <ListOptionsProvider>{children}</ListOptionsProvider>
      </PricesProvider>
    </DeckProvider>
  );
};
