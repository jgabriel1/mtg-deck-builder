import { FunctionComponent, FormEventHandler } from 'react';
import { Input, InputProps } from '@chakra-ui/input';
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

interface SearchBoxProps extends InputProps {
  onSubmitCard: FormEventHandler;
  possibleCards: string[];
}

export const SearchBox: FunctionComponent<SearchBoxProps> = ({
  onSubmitCard,
  possibleCards,
  onChange,
}) => {
  const isLoading = false;

  return (
    <HStack as="form" w="100%" onSubmit={onSubmitCard}>
      <Menu>
        <VStack w="100%">
          <Input
            my="4"
            size="lg"
            placeholder="Search card name..."
            mb="8px"
            onChange={onChange}
          />

          <MenuButton w="100%" visibility="hidden" />
        </VStack>

        {/* TODO: Options are not working properly. */}
        <MenuList w="100%" mt="-4">
          {possibleCards.length > 0 &&
            possibleCards.map((card, index) => (
              <MenuItem key={`possibleCards:${index}`}>{card}</MenuItem>
            ))}
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
