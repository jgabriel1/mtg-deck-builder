import { FunctionComponent, useMemo } from 'react';
import { List } from '@chakra-ui/react';
import { CardBlock } from './CardBlock';
import { CardData } from '../../services/cardData';
import { CardType, parseCardType } from '../../services/cardData/util';

type CardItemData = {
  quantity: number;
  data: CardData;
};

type CardsListProps = {
  cards: CardItemData[];
};

type CardBlockData = {
  title: CardType;
  cards: CardItemData[];
};

export const CardsList: FunctionComponent<CardsListProps> = ({ cards }) => {
  const blocks = useMemo<CardBlockData[]>(() => {
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
          a.data.name.localeCompare(b.data.name)
        ),
      }));
  }, [cards]);

  return (
    <List spacing={1} w="100%">
      {blocks.map(block => (
        <CardBlock
          key={`cardListBlock:${block.title}`}
          title={block.title}
          cards={block.cards}
        />
      ))}
    </List>
  );
};
