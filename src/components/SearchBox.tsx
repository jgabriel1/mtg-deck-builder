import {
  FormEventHandler,
  FunctionComponent,
  ChangeEventHandler,
  useRef,
} from 'react';
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
import { useMutation } from 'react-query';

import { CARD_DATA, POSSIBLE_CARD_NAMES } from '../data/keys';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    mutate: mutatePossibleCards,
    data: possibleCards,
    reset: resetPossibleCards,
  } = useMutation({
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
    onSuccess: (data, q) => {
      if (data === null) mutatePossibleCards(q);
    },
  });

  const handleSubmitCard: FormEventHandler = event => {
    event.preventDefault();

    if (selectedCard) {
      onSubmitCard(selectedCard);

      resetSelectedCard();

      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleInputValueChange = withDebounce<ChangeInputEventHandler>(
    event => {
      mutateSelectedCard(event.target.value);
    },
    500
  );

  const handleSelectPossibleCard = (cardName: string) => {
    mutateSelectedCard(cardName, {
      onSettled: () => {
        resetPossibleCards();
      },
    });
  };

  const isLoading = false;

  return (
    <HStack as="form" w="100%" onSubmit={handleSubmitCard}>
      <Menu isOpen={possibleCards && possibleCards.length > 0}>
        <VStack w="100%">
          <Input
            ref={inputRef}
            my="4"
            size="lg"
            placeholder="Search card name..."
            mb="8px"
            onChange={handleInputValueChange}
          />

          <MenuButton w="100%" visibility="hidden" />
        </VStack>

        <MenuList w="100%" mt="-4" bg="gray.800">
          {possibleCards &&
            possibleCards.length > 0 &&
            possibleCards.map((card, index) => (
              <MenuItem
                key={`possibleCards:${index}`}
                _hover={{ color: 'gray.800' }}
                onClick={() => handleSelectPossibleCard(card)}
              >
                {card}
              </MenuItem>
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
