import { VStack } from '@chakra-ui/react';
import { CardBlockData } from '../../types';
import { CardImageBlock } from './CardImageBlock';

type CardImagesListProps = {
  blocks: CardBlockData[];
};

export const CardImagesList = ({ blocks }: CardImagesListProps) => {
  return (
    <VStack w="100%">
      {blocks.map(block => (
        <CardImageBlock
          key={`cardImageBlock:${block.title}`}
          title={block.title}
          cards={block.cards}
        />
      ))}
    </VStack>
  );
};
