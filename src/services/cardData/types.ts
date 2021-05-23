export type Card = {
  id: string;
  name: string;
  mana_cost: string;
  image_uris: {
    normal: string;
    large: string;
  };
};

export type CardsSearchResponseData = {
  data: Card[];
};
