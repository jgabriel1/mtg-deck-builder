import { client } from './client';
import { Card } from './types';

type CardsListResponse = {
  data: Card[];
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

  return responseData.data;
};
