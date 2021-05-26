import { Input } from '@chakra-ui/input';
import {
  HStack,
  Button,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

type SearchBoxProps = {};

export const SearchBox: React.FC = () => {
  const isLoading = false;

  return (
    <HStack as="form" w="100%">
      <Menu>
        <VStack w="100%">
          <Input my="4" size="lg" placeholder="Search card name..." mb="8px" />

          <MenuButton w="100%" visibility="hidden" />
        </VStack>

        <MenuList w="100%" mt="-4">
          <MenuItem>Test1</MenuItem>
          <MenuItem>Test2</MenuItem>
          <MenuItem>Test3</MenuItem>
        </MenuList>
      </Menu>

      <Button
        type="submit"
        size="lg"
        colorScheme="blue"
        loadingText="aa"
        isLoading={isLoading}
      >
        <Text>Add</Text>
      </Button>
    </HStack>
  );
};
