import { client } from './client';

type CardNameAutoCompleteResponse = {
  data: string[];
};

export const getCardNameAutoComplete = async (query: string) => {
  const { data: responseData } = await client.get<CardNameAutoCompleteResponse>(
    'cards/autocomplete',
    {
      params: {
        q: query,
        pretty: false,
        include_extras: false,
      },
    }
  );

  const possibleNames = responseData.data;

  return possibleNames;
};
