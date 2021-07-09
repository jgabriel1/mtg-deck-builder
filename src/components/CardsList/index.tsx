import React, { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
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
    <Box mx="auto" sx={{ columnCount: 3, columnGap: '8px' }} pb="8">
      {blocks.map(block => (
        <Box
          key={`cardListBlock:${block.title}`}
          w="100%"
          mb={2}
          display="inline"
          borderRadius="lg"
        >
          <CardBlock title={block.title} cards={block.cards} />
        </Box>
      ))}
    </Box>
  );
};
