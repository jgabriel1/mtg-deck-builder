import {
  CardItemData,
  CardSeparatorFunction,
  CardSeparators,
  CardType,
} from '../../types';

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

const parseCardType = (typeString: string): CardType => {
  const types = typeString.replace('-', '').split(' ');

  for (let cardType of typePriority)
    if (types.includes(cardType)) return cardType;

  return CardType.DEFAULT;
};

const separateByCardType: CardSeparatorFunction = cards => {
  const cardBlocks = new Map<CardType, CardItemData[]>();

  cards.forEach(card => {
    const cardType = parseCardType(card.data.type_line);

    if (cardBlocks.has(cardType)) {
      cardBlocks.get(cardType)?.push(card);
    } else {
      cardBlocks.set(cardType, [card]);
    }
  });

  return Array.from(cardBlocks)
    .map(([cardType, cards]) => ({ title: cardType, cards }))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(block => ({
      title: block.title,
      cards: block.cards.sort((a, b) =>
        a.data.cmc === b.data.cmc
          ? a.data.name.localeCompare(b.data.name)
          : a.data.cmc - b.data.cmc
      ),
    }));
};

const separateByCMC: CardSeparatorFunction = cards => {
  const cardBlocks = new Map<number, CardItemData[]>();

  cards.forEach(card => {
    const { cmc } = card.data;

    if (cardBlocks.has(cmc)) {
      cardBlocks.get(cmc)?.push(card);
    } else {
      cardBlocks.set(cmc, [card]);
    }
  });

  return Array.from(cardBlocks)
    .map(([cmc, cards]) => ({ title: cmc, cards }))
    .sort((a, b) => a.title - b.title)
    .map(block => ({
      title: `Mana Value ${block.title}`,
      cards: block.cards.sort((a, b) =>
        a.data.cmc === b.data.cmc
          ? a.data.name.localeCompare(b.data.name)
          : a.data.cmc - b.data.cmc
      ),
    }));
};

export const separators: CardSeparators = {
  data: {
    CARD_TYPE: {
      title: 'Card Type',
      separatorCallback: separateByCardType,
    },

    MANA_VALUE: {
      title: 'Mana Value',
      separatorCallback: separateByCMC,
    },
  },

  separateBy(key: string, cards: CardItemData[]) {
    if (!this.data.hasOwnProperty(key)) {
      return separateByCardType(cards); // Default grouping function
    }

    return this.data[key].separatorCallback(cards);
  },
};
