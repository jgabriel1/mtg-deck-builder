import { FormEventHandler, FunctionComponent, ChangeEventHandler } from 'react';
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
import { CARD_DATA, POSSIBLE_CARD_NAMES } from '../data/keys';
import { useMutation } from 'react-query';
import {
  CardData,
  getCardDataFromName,
  getCardNameAutoComplete,
} from '../services/cardData';
import { withDebounce } from '../utils/withDebounce';

type SearchBoxProps = {
  onSubmitCard: (card: CardData) => void;
};

type ChangeInputEventHandler = ChangeEventHandler<HTMLInputElement>;

export const SearchBox: FunctionComponent<SearchBoxProps> = ({
  onSubmitCard,
}) => {
  const { mutate: mutatePossibleCards, data: possibleCards } = useMutation({
    mutationKey: POSSIBLE_CARD_NAMES,
    mutationFn: async (q: string) => {
      console.log('fetched possibles');

      return await getCardNameAutoComplete(q);
    },
  });

  const {
    mutate: mutateSelectedCard,
    data: selectedCard,
    reset: resetSelectedCard,
  } = useMutation({
    mutationKey: CARD_DATA,
    mutationFn: async (q: string) => {
      console.log('fetched');

      return await getCardDataFromName(q);
    },
    onSettled: (data, _, q) => {
      if (data === null) mutatePossibleCards(q);
    },
  });

  const handleSubmitCard: FormEventHandler = event => {
    event.preventDefault();

    if (selectedCard) {
      onSubmitCard(selectedCard);

      resetSelectedCard();
    }
  };

  const handleInputValueChange = withDebounce<ChangeInputEventHandler>(
    e => mutateSelectedCard(e.target.value),
    500
  );

  const isLoading = false;

  return (
    <HStack as="form" w="100%" onSubmit={handleSubmitCard}>
      <Menu>
        <VStack w="100%">
          <Input
            my="4"
            size="lg"
            placeholder="Search card name..."
            mb="8px"
            onChange={handleInputValueChange}
          />

          <MenuButton w="100%" visibility="hidden" />
        </VStack>

        {/* TODO: Options are not working properly.
        <MenuList w="100%" mt="-4">
          {possibleCards.length > 0 &&
            possibleCards.map((card, index) => (
              <MenuItem key={`possibleCards:${index}`}>{card}</MenuItem>
            ))}
        </MenuList> */}
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
