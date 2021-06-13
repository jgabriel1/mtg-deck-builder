import React, {
  ChangeEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Textarea,
  VStack,
  HStack,
  OrderedList,
} from '@chakra-ui/react';
import { parseCardList, ParseListError } from './parseCardList';

import { useDeck } from '../../hooks/deck';
import { useCardList } from '../../data/useCardList';

import { CardData } from '../../services/cardData';

type FetchedCardsState = {
  found: Array<{
    data: CardData;
    quantity: number;
  }>;
  notFound: string[];
};

interface ImportListModalProps extends Omit<ModalProps, 'children'> {}

export const ImportListModal: FunctionComponent<ImportListModalProps> = ({
  ...modalProps
}) => {
  const { setAllCards: addAllCardsToDeck } = useDeck();

  const { mutateCardList, isCardListLoading } = useCardList();

  const [listString, setListString] = useState('');

  const [isParseListError, setIsParseListError] = useState(false);

  const [cards, dispatchCards] = useState<FetchedCardsState>({
    found: [],
    notFound: [],
  });

  const onChangeListInput: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const { value } = e.target;

    setListString(value);
  };

  const resetCards = () => {
    dispatchCards({ found: [], notFound: [] });
  };

  const handleSubmitList = async () => {
    try {
      const parsedCardsData = parseCardList(listString);

      mutateCardList(
        parsedCardsData.map(card => card.cardName),
        {
          onSuccess: ({ cards, notFound }) => {
            dispatchCards({
              found: cards.map(card => {
                const quantity =
                  parsedCardsData.find(c => c.cardName === card.name)
                    ?.quantity || 1;

                return {
                  quantity,
                  data: card,
                };
              }),
              notFound: notFound.map(c => c.name),
            });
          },
        }
      );
    } catch (err) {
      if (err instanceof ParseListError) setIsParseListError(true);
    }
  };

  const handleAddCardsToDeck = () => {
    addAllCardsToDeck(cards.found);

    modalProps.onClose();
  };

  useEffect(() => {
    return () => {
      setListString('');
      setIsParseListError(false);
      resetCards();
    };
  }, [modalProps.isOpen]);

  useEffect(() => {
    setIsParseListError(false);
    resetCards();
  }, [listString]);

  useEffect(() => {
    const cardsWereFound = cards.found.length > 0;
    const noCardsWereNotFound = !(cards.notFound.length > 0);

    if (cardsWereFound && noCardsWereNotFound) {
      addAllCardsToDeck(cards.found);

      modalProps.onClose();
    }
  }, [cards.found, cards.notFound]);

  return (
    <Modal {...modalProps}>
      <ModalOverlay />

      <ModalContent bg="gray.800">
        <ModalHeader>Import from list</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Textarea
            value={listString}
            isInvalid={isParseListError}
            onChange={onChangeListInput}
            placeholder={`1 Sol Ring\n10 Mountain`}
            resize="none"
            size="md"
            h="sm"
          />

          <VStack w="100%">
            {isParseListError && (
              <Alert status="error" borderRadius="lg" bg="none">
                <AlertIcon />

                <AlertTitle fontSize="sm" fontWeight="semibold" color="red.400">
                  Please input a list in the supported format!
                </AlertTitle>
              </Alert>
            )}

            {cards.notFound.length > 0 && (
              <Alert
                status="warning"
                borderRadius="lg"
                bg="none"
                pb="0"
                fontSize="sm"
                color="yellow.500"
              >
                <Flex flexDir="column" justify="flex-start" w="100%">
                  <Flex flexDir="row" align="center" mb="2">
                    <AlertIcon />

                    <AlertTitle fontWeight="semibold">
                      Some cards were not found:
                    </AlertTitle>
                  </Flex>

                  <OrderedList w="inherit" pl="8" mb="2">
                    {cards.notFound.map(cardName => (
                      <ListItem key={`cardsNotFound:${cardName}`}>
                        {cardName}
                      </ListItem>
                    ))}
                  </OrderedList>

                  <AlertDescription>
                    Would you like to submit the rest of the cards?
                  </AlertDescription>
                </Flex>
              </Alert>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          {cards.notFound.length > 0 ? (
            <HStack>
              <Button size="sm" colorScheme="whiteAlpha" onClick={resetCards}>
                Cancel
              </Button>

              <Button
                colorScheme="blue"
                size="sm"
                onClick={handleAddCardsToDeck}
              >
                Submit Anyways
              </Button>
            </HStack>
          ) : (
            <Button
              colorScheme="blue"
              onClick={handleSubmitList}
              isLoading={isCardListLoading}
              isDisabled={cards.notFound.length > 0 || isParseListError}
            >
              Submit
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
