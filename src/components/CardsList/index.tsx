import { useMemo, useState } from 'react';
import { List } from '@chakra-ui/react';
import { CardBlock } from './CardBlock';
import { separators } from './util';
import { CardBlockData, CardItemData } from './types';
import { OptionsBar } from './OptionsBar';

type CardsListProps = {
  cards: CardItemData[];
};

export const CardsList = ({ cards }: CardsListProps) => {
  const [groupCardsBy, setGroupCardsBy] = useState('CARD_TYPE');

  const blocks = useMemo<CardBlockData[]>(() => {
    return separators.separateBy(groupCardsBy, cards);
  }, [cards, groupCardsBy]);

  return (
    <>
      <OptionsBar setGroupCardsBy={setGroupCardsBy} />

      <List spacing={1} w="100%">
        {blocks.map(block => (
          <CardBlock
            key={`cardListBlock:${block.title}`}
            title={block.title}
            cards={block.cards}
          />
        ))}
      </List>
    </>
  );
};
