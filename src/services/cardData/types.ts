export type CardData = {
  id: string;
  name: string;
  mana_cost: string;
  image_uris: {
    normal: string;
    large: string;
  };
  cmc: number;
  type_line: string;
};
