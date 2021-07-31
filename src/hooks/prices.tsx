import { createContext, FC, useContext, useMemo } from 'react';
import { useQueries, UseQueryResult } from 'react-query';
import { reduce } from 'lodash';
import { CardPriceFromLiga, getCardPriceFromLiga } from '../services/api';
import { useDeck } from './deck';

interface PricesMap {
  [name: string]: CardPriceFromLiga;
}

interface PricesContextData {
  prices: PricesMap;
  totalDeckPrice: number;
}

const PricesContext = createContext({} as PricesContextData);

export const PricesProvider: FC = ({ children }) => {
  const { deck } = useDeck();

  const priceQueries = useQueries(
    deck.map(card => ({
      queryKey: ['LIGA_PRICE', card.data.name],
      queryFn: () => getCardPriceFromLiga(card.data.name),
      staleTime: 1000 * 3600 * 24, // 1 day
    }))
  );

  const prices = useMemo(() => {
    const pricesMap: PricesMap = {};

    priceQueries.forEach(query => {
      const { data } = query as UseQueryResult<CardPriceFromLiga>;

      if (data) {
        Object.assign(pricesMap, { [data.name]: data });
      }
    });

    return pricesMap;
  }, [priceQueries]);

  return (
    <PricesContext.Provider
      value={{
        prices,
        totalDeckPrice: reduce(prices, (acc, price) => acc + price.value, 0),
      }}
    >
      {children}
    </PricesContext.Provider>
  );
};

export const useCardPrices = () => useContext(PricesContext);

export const useCardPrice = (cardName: string) => {
  const { prices } = useContext(PricesContext);

  return prices[cardName] || null;
};
