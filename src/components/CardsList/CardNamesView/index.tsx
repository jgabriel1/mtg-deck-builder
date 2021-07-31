import { Box } from '@chakra-ui/react';
import { CardBlockData } from '../../../types';
import { CardBlock } from './CardBlock';

type CardNamesListProps = {
  blocks: CardBlockData[];
};

export const CardNamesList = ({ blocks }: CardNamesListProps) => {
  return (
    <Box mx="auto" sx={{ columnCount: 2, columnGap: '8px' }} pb="8">
      {blocks.map(block => (
        <Box
          key={`cardListBlock:${block.title}`}
          w="100%"
          mb={2}
          display="inline-block"
          borderRadius="lg"
        >
          <CardBlock title={block.title} cards={block.cards} />
        </Box>
      ))}
    </Box>
  );
};
