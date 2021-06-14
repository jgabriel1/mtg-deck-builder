import { client } from './client';
import { CardData } from './types';

type CardsListResponse = {
  data: Array<CardData>;
  not_found: Array<{ name: string }>;
};

const splitArray = <T>(array: T[], sizeLimit: number) => {
  const slices = [];

  for (let i = 0; i <= array.length; i += sizeLimit)
    slices.push(array.slice(i, i + sizeLimit));

  return slices;
};

const CARD_LIMIT = 75;

export const getCardsFromList = async (cardNames: string[]) => {
  const slices = splitArray(cardNames, CARD_LIMIT);

  const results = await Promise.all(
    slices.map(async slice => {
      const { data: responseData } = await client.post<CardsListResponse>(
        'cards/collection',
        {
          identifiers: slice.map(name => {
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
    })
  );

  return results.reduce(
    (accum, result) => {
      return {
        cards: [...accum.cards, ...result.cards],
        notFound: [...accum.notFound, ...result.notFound],
      };
    },
    { cards: [], notFound: [] }
  );
};
