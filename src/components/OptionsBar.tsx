import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { useListOptions } from '../hooks/listOptions';

export const OptionsBar = () => {
  const { toggleDisplayMode, toggleGroupMode } = useListOptions();

  return (
    <HStack w="100%" pb="4" spacing="4">
      <Menu>
        <MenuButton as={Button} fontSize="sm">
          Group By
        </MenuButton>

        <MenuList>
          <MenuItem onClick={() => toggleGroupMode('CARD_TYPE')}>
            Card Type
          </MenuItem>

          <MenuItem onClick={() => toggleGroupMode('MANA_VALUE')}>
            Mana Value
          </MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton as={Button} fontSize="sm">
          Display Mode
        </MenuButton>

        <MenuList>
          <MenuItem onClick={() => toggleDisplayMode('LIST')}>List</MenuItem>

          <MenuItem onClick={() => toggleDisplayMode('VISUAL')}>
            Visual
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
