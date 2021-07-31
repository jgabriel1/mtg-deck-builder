import axios from 'axios';

export interface CardPriceFromLiga {
  name: string;
  text: string;
  value: number;
}

const api = axios.create({
  baseURL: 'api',
});

export const getCardPriceFromLiga = async (cardName: string) => {
  const { data } = await api.get<CardPriceFromLiga>('prices/liga', {
    params: { cardName },
  });

  return data;
};
