import { FunctionComponent } from 'react';
import { List } from '@chakra-ui/react';
import { CardItem } from './CardItem';

type CardsListProps = {
  cards: Array<{
    quantity: number;
    data: {
      id: string;
      name: string;
      mana_cost: string;
    };
  }>;
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
