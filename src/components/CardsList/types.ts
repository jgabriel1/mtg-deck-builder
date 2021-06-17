import { CardData } from '../../services/cardData';

export enum CardType {
  LAND = 'Land',
  CREATURE = 'Creature',
  ENCHANTMENT = 'Enchantment',
  ARTIFACT = 'Artifact',
  INSTANT = 'Instant',
  SORCERY = 'Sorcery',
  PLANESWALKER = 'Planeswalker',
  LEGENDARY = 'Legendary',
  DEFAULT = '',
}

export type CardItemData = {
  quantity: number;
  data: CardData;
};

export type CardBlockData = {
  title: CardType | string;
  cards: CardItemData[];
};

export type CardSeparatorFunction<O = any> = (
  cards: CardItemData[],
  options?: O
) => CardBlockData[];