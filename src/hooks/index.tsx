import { FunctionComponent } from 'react';

import { DeckProvider } from './deck';

export const AppProvider: FunctionComponent = ({ children }) => {
  return <DeckProvider>{children}</DeckProvider>;
};
