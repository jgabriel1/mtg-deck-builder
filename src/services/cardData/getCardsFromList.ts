import { client } from './client';
import { CardData } from './types';

type CardsListResponse = {
  data: CardData[];
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
