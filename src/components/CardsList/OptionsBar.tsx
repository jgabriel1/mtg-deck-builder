import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { separators } from './util';

type OptionsBarProps = {
  setGroupCardsBy: (key: string) => void;
};

export const OptionsBar = ({ setGroupCardsBy }: OptionsBarProps) => {
  return (
    <Box w="100%" pb="4">
      <Menu>
        <MenuButton
          as={Button}
          bg="gray.800"
          fontSize="sm"
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.700' }}
        >
          Group By
        </MenuButton>

        <MenuList bg="gray.800">
          {Object.entries(separators.data).map(([key, value]) => (
            <MenuItem
              key={`groupByMenu:${key}`}
              onClick={() => setGroupCardsBy(key)}
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.700' }}
            >
              {value.title}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
