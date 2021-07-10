import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { DisplayMode, GroupMode, useListOptions } from '../hooks/listOptions';

export const OptionsBar = () => {
  const { options, toggleDisplayMode, toggleGroupMode } = useListOptions();

  const groupModeMenu = useDisclosure();
  const displayModeMenu = useDisclosure();

  const handleChangeGroupMode = (value: string | string[]) => {
    groupModeMenu.onClose();

    toggleGroupMode(value as GroupMode);
  };

  const handleChangeDisplayMode = (value: string | string[]) => {
    displayModeMenu.onClose();

    toggleDisplayMode(value as DisplayMode);
  };

  return (
    <HStack spacing="4">
      <Menu {...groupModeMenu}>
        <MenuButton as={Button} fontSize="sm">
          Group By
        </MenuButton>

        <MenuList>
          <MenuOptionGroup
            type="radio"
            value={options.groupMode}
            onChange={handleChangeGroupMode}
          >
            <MenuItemOption value="CARD_TYPE">Card Type</MenuItemOption>

            <MenuItemOption value="MANA_VALUE">Mana Value</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>

      <Menu {...displayModeMenu}>
        <MenuButton as={Button} fontSize="sm">
          Display Mode
        </MenuButton>

        <MenuList>
          <MenuOptionGroup
            type="radio"
            value={options.displayMode}
            onChange={handleChangeDisplayMode}
          >
            <MenuItemOption value={'LIST'}>List</MenuItemOption>

            <MenuItemOption value={'VISUAL'}>Visual</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </HStack>
  );
};
