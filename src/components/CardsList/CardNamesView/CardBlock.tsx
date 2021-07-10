import { useMemo } from 'react';
import {
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  Divider,
} from '@chakra-ui/react';
import { CardItem } from './CardItem';
import { CardData } from '../../../services/cardData';

type CardItemData = {
  quantity: number;
  data: CardData;
};

type CardBlockProps = {
  title: string;
  cards: CardItemData[];
};

export const CardBlock = ({ title, cards }: CardBlockProps) => {
  const totalCards = useMemo(() => {
    return cards.reduce((accum, card) => accum + card.quantity, 0);
  }, [cards]);

  return (
    <Container borderRadius="md" maxW="100%">
      <Flex justify="space-between" align="center" mb="4">
        <Heading size="sm" fontWeight="semibold">
          {title}
        </Heading>

        <Text fontSize="sm" fontWeight="semibold" color="gray.400">
          {`(${totalCards})`}
        </Text>
      </Flex>

      <List>
        {cards.map(card => (
          <ListItem key={`cardItem:${card.data.id}`}>
            <CardItem
              quantity={card.quantity}
              name={card.data.name}
              mana_cost={card.data.mana_cost}
              imageUrl={card.data.image_uris.large}
            />
          </ListItem>
        ))}
      </List>

      <Divider my="4" />
    </Container>
  );
};
