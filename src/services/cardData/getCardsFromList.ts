import { client } from './client';
import { CardData } from './types';

type CardsListResponse = {
  data: Array<CardData>;
  not_found: Array<{ name: string }>;
};

export const getCardsFromList = async (cardNames: string[]) => {
  const { data: responseData } = await client.post<CardsListResponse>(
    'cards/collection',
    {
      identifiers: cardNames.map(name => {
        return { name };
      }),
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return {
    cards: responseData.data,
    notFound: responseData.not_found,
  };
};
