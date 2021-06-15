import { useMemo } from 'react';
import { List } from '@chakra-ui/react';
import { CardBlock } from './CardBlock';
import { separateByCardType } from './util';
import { CardBlockData, CardItemData } from './types';

type CardsListProps = {
  cards: CardItemData[];
};

export const CardsList = ({ cards }: CardsListProps) => {
  const blocks = useMemo<CardBlockData[]>(() => {
    return separateByCardType(cards);
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
