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
        <MenuButton as={Button} fontSize="sm">
          Group By
        </MenuButton>

        <MenuList>
          {Object.entries(separators.data).map(([key, value]) => (
            <MenuItem
              key={`groupByMenu:${key}`}
              onClick={() => setGroupCardsBy(key)}
            >
              {value.title}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
