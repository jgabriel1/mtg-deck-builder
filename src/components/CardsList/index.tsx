import { Divider, List, ListItem } from '@chakra-ui/react';
import { CardItem } from './CardItem';

type CardsListProps = {};

export const CardsList = () => {
  return (
    <List spacing={1} w="100%">
      <CardItem name="Sai, Master Thopterist" mana_cost="{2}{U}" />
      <CardItem name="Island" quantity={10} />
      <CardItem name="Silver Myr" mana_cost="{2}" />
      <CardItem name="Manakin" mana_cost="{2}" />
    </List>
  );
};
