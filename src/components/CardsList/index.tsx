import React, { useMemo, useState } from 'react';
import {
  Box,
  Divider,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { CardBlock } from './CardBlock';
import { separatorFunctions } from './util';
import { CardBlockData, CardItemData } from './types';

type CardsListProps = {
  cards: CardItemData[];
};

export const CardsList = ({ cards }: CardsListProps) => {
  const [groupCardsBy, setGroupCardsBy] = useState('CARD_TYPE');

  const blocks = useMemo<CardBlockData[]>(() => {
    return separatorFunctions[groupCardsBy].separatorCallback(cards);
  }, [cards, groupCardsBy]);

  return (
    <>
      <Box w="100%">
        <Menu>
          <MenuButton
            px={4}
            py={2}
            borderRadius="md"
            bg="gray.700"
            _focus={{ boxShadow: 'outline' }}
            fontSize="sm"
          >
            Group By
          </MenuButton>

          <MenuList bg="gray.800">
            {Object.keys(separatorFunctions).map(key => (
              <MenuItem
                key={`groupByMenu:${key}`}
                onClick={() => setGroupCardsBy(key)}
                _hover={{ bg: 'gray.700' }}
              >
                {separatorFunctions[key].title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Divider mt="4" mb="8" borderColor="gray.400" />
      </Box>

      <List spacing={1} w="100%">
        {blocks.map(block => (
          <CardBlock
            key={`cardListBlock:${block.title}`}
            title={block.title}
            cards={block.cards}
          />
        ))}
      </List>
    </>
  );
};
