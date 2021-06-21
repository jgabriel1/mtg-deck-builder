import React, { useMemo } from 'react';
import { Container, List } from '@chakra-ui/react';
import { CardBlock } from './CardBlock';
import { separators } from './util';
import { CardBlockData, CardItemData } from '../../types';
import { useListOptions } from '../../hooks/listOptions';

type CardsListProps = {
  cards: CardItemData[];
};

export const CardsList = ({ cards }: CardsListProps) => {
  const { options } = useListOptions();

  const blocks = useMemo<CardBlockData[]>(() => {
    return separators.separateBy(options.groupMode, cards);
  }, [cards, options.groupMode]);

  return (
    <Container maxW="100%">
      <List spacing={1} w="100%">
        {blocks.map(block => (
          <CardBlock
            key={`cardListBlock:${block.title}`}
            title={block.title}
            cards={block.cards}
          />
        ))}
      </List>
    </Container>
  );
};
