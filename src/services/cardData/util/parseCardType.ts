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

const typePriority = [
  CardType.CREATURE,
  CardType.LAND,
  CardType.ARTIFACT,
  CardType.ENCHANTMENT,
  CardType.INSTANT,
  CardType.SORCERY,
  CardType.PLANESWALKER,
  CardType.LEGENDARY,
];

export const parseCardType = (typeString: string): CardType => {
  const types = typeString.replace('-', '').split(' ');

  for (let cardType of typePriority)
    if (types.includes(cardType)) return cardType;

  return CardType.DEFAULT;
};
