import { FunctionComponent } from 'react';
import { List } from '@chakra-ui/react';

import { CardItem } from './CardItem';
import { CardData } from '../../services/cardData';

type CardsListProps = {
  cards: Array<{ quantity: number; data: CardData }>;
};

export const CardsList: FunctionComponent<CardsListProps> = ({ cards }) => {
  return (
    <List spacing={1} w="100%">
      {cards.map(card => (
        <CardItem
          key={`cardsList:${card.data.id}`}
          quantity={card.quantity}
          name={card.data.name}
          mana_cost={card.data.mana_cost}
        />
      ))}
    </List>
  );
};
