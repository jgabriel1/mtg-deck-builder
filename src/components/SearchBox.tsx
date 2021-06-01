import {
  FormEventHandler,
  FunctionComponent,
  ChangeEventHandler,
  useRef,
} from 'react';
import {
  HStack,
  Button,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  VStack,
  Input,
} from '@chakra-ui/react';

import { CardData } from '../services/cardData';
import { withDebounce } from '../utils/withDebounce';
import { usePossibleCards, useSelectedCard } from '../data';

type SearchBoxProps = {
  onSubmitCard: (card: CardData) => void;
};

type ChangeInputEventHandler = ChangeEventHandler<HTMLInputElement>;

export const SearchBox: FunctionComponent<SearchBoxProps> = ({
  onSubmitCard,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    mutatePossibleCards,
    possibleCards,
    resetPossibleCards,
    isPossibleCardsLoading,
  } = usePossibleCards();

  const {
    mutateSelectedCard,
    selectedCard,
    resetSelectedCard,
    isSelectedCardLoading,
  } = useSelectedCard({
    onCardNotFound: q => {
      mutatePossibleCards(q);
    },
  });

  const resetInputValue = () => {
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmitCard: FormEventHandler = event => {
    event.preventDefault();

    if (selectedCard) {
      onSubmitCard(selectedCard);

      resetSelectedCard();
      resetInputValue();
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
      onSettled: cardData => {
        if (cardData) {
          onSubmitCard(cardData);

          resetSelectedCard();
          resetPossibleCards();
          resetInputValue();
        }
      },
    });
  };

  const isLoading = isSelectedCardLoading || isPossibleCardsLoading;

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

        {possibleCards && possibleCards.length > 0 && (
          <MenuList w="100%" mt="-4" bg="gray.800">
            {possibleCards.map((card, index) => (
              <MenuItem
                key={`possibleCards:${index}`}
                _hover={{ color: 'gray.800' }}
                onClick={() => handleSelectPossibleCard(card)}
              >
                {card}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </Menu>

      <Button type="submit" size="lg" colorScheme="blue" isLoading={isLoading}>
        <Text>Add</Text>
      </Button>
    </HStack>
  );
};
