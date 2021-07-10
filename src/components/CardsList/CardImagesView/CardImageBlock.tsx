import { Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { CardData } from '../../../services/cardData';
import { CardImageItem } from './CardImageItem';

type CardItemData = {
  quantity: number;
  data: CardData;
};

type CardImageBlockProps = {
  title: string;
  cards: CardItemData[];
};

export const CardImageBlock = ({ title, cards }: CardImageBlockProps) => {
  const totalCards = useMemo(() => {
    return cards.reduce((accum, card) => accum + card.quantity, 0);
  }, [cards]);

  return (
    <Container maxW="container.lg">
      <Flex justify="space-between" align="center" mb="28">
        <Heading size="sm" fontWeight="semibold">
          {title}
        </Heading>

        <Text fontSize="sm" fontWeight="semibold" color="gray.400">
          {`(${totalCards})`}
        </Text>
      </Flex>

      <Flex wrap="wrap">
        {cards.map(card => (
          <CardImageItem
            key={`cardImageItem:${card.data.id}`}
            imageUrl={card.data.image_uris.normal}
            quantity={card.quantity}
          />
        ))}
      </Flex>

      <Divider my="8" />
    </Container>
  );
};
