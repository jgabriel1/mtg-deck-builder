import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
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
      <Box w="100%" pb="4">
        <Menu>
          <MenuButton
            as={Button}
            bg="gray.700"
            fontSize="sm"
            _hover={{ bg: 'gray.600' }}
            _active={{ bg: 'gray.600' }}
          >
            Group By
          </MenuButton>

          <MenuList bg="gray.800">
            {Object.keys(separatorFunctions).map(key => (
              <MenuItem
                key={`groupByMenu:${key}`}
                onClick={() => setGroupCardsBy(key)}
                _hover={{ bg: 'gray.600' }}
                _active={{ bg: 'gray.600' }}
              >
                {separatorFunctions[key].title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
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
