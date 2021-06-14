import { FunctionComponent, useMemo } from 'react';
import {
  Container,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { CardItem } from './CardItem';
import { CardData } from '../../services/cardData';

type CardItemData = {
  quantity: number;
  data: CardData;
};

type CardBlockProps = {
  title: string;
  cards: CardItemData[];
};

export const CardBlock: FunctionComponent<CardBlockProps> = ({
  title,
  cards,
}) => {
  const totalCards = useMemo(() => {
    return cards.reduce((accum, card) => accum + card.quantity, 0);
  }, [cards]);

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <Heading size="md" fontWeight="semibold" mb="4">
          {title}
        </Heading>

        <Text fontSize="sm" fontWeight="medium" color="gray.300">
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

      <Divider mt="4" mb="8" borderColor="gray.400" />
    </Container>
  );
};
