import { client } from './client';
import { CardData } from './types';

export const getCardDataFromName = async (query: string) => {
  try {
    const { data: possibleCard } = await client.get<CardData>('cards/named', {
      params: {
        fuzzy: query,
        pretty: false,
        include_extras: false,
      },
    });

    return possibleCard;
  } catch {
    return null;
  }
};
