import { AxiosInstance } from 'axios';

import { createClient } from './client';
import { Card, CardsSearchResponseData } from './types';

export class CarSearchClient {
  private client: AxiosInstance;

  public constructor() {
    this.client = createClient();
  }

  /*
    TODO: Look into cards/autocomplete or cards/named, since it does not show
    some obvious ones on the top like basic lands.
  */
  public async searchCardName(query: string): Promise<Card[]> {
    // https://scryfall.com/docs/api/cards/search
    try {
      const { data: responseData } =
        await this.client.get<CardsSearchResponseData>('cards/search', {
          params: {
            q: query,
            pretty: false,
            include_extras: false,
          },
        });

      return responseData.data;
    } catch {
      return [];
    }
  }
}
