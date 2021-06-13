import { ChangeEventHandler, useEffect, useState } from 'react';
import {
  Button,
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
} from '@chakra-ui/react';

import { CardsNotFoundAlert, ParseListErrorAlert } from './components';

import { parseCardList, ParseListError } from './parseCardList';

import { useDeck } from '../../hooks/deck';
import { useCardsFromList } from '../../data';

import { CardData } from '../../services/cardData';

type FetchedCardsState = {
  found: Array<{
    data: CardData;
    quantity: number;
  }>;
  notFound: string[];
};

type ImportListModalProps = Omit<ModalProps, 'children'>;

export const ImportListModal = ({ ...modalProps }: ImportListModalProps) => {
  const { addAllCardsToDeck } = useDeck();

  const { mutateCardsList, isCardsListLoading } = useCardsFromList();

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

      mutateCardsList(
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
            {isParseListError && <ParseListErrorAlert />}

            {cards.notFound.length > 0 && (
              <CardsNotFoundAlert cardsNotFound={cards.notFound} />
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
              isLoading={isCardsListLoading}
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
