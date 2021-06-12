import {
  ChangeEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
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
  UnorderedList,
  VStack,
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
  const { setAllCards } = useDeck();

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

  const addFoundCardsToDeck = () => {
    setAllCards(cards.found);
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
              found: cards.map(card => ({
                quantity:
                  parsedCardsData.find(c => c.cardName === card.name)
                    ?.quantity || 1,
                data: card,
              })),
              notFound: notFound.map(c => c.name),
            });
          },
        }
      );
    } catch (err) {
      if (err instanceof ParseListError) setIsParseListError(true);
    }
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
      addFoundCardsToDeck();
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
            placeholder={`1 Sol Ring\n10 Mountain\n...`}
            resize="none"
            size="md"
            h="sm"
          />
        </ModalBody>

        <ModalFooter>
          <Flex w="100%" justify="space-between" align="center">
            <VStack>
              {isParseListError && (
                <Alert status="error" borderRadius="lg" bg="none">
                  <AlertIcon />

                  <AlertTitle
                    fontSize="sm"
                    fontWeight="semibold"
                    color="red.400"
                  >
                    Please input a list in the supported format!
                  </AlertTitle>
                </Alert>
              )}

              {cards.notFound.length > 0 && (
                <VStack w="100%" spacing="2">
                  <Alert status="warning" borderRadius="lg" bg="none" pb="0">
                    <AlertIcon />

                    <AlertTitle
                      fontSize="sm"
                      fontWeight="semibold"
                      color="yellow.500"
                    >
                      Some cards were not found:
                    </AlertTitle>
                  </Alert>

                  <UnorderedList w="inherit" pl="16">
                    {cards.notFound.map(cardName => (
                      <ListItem
                        key={`cardsNotFound:${cardName}`}
                        fontSize="sm"
                        color="yellow.500"
                      >
                        {cardName}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </VStack>
              )}
            </VStack>

            <Button
              colorScheme="blue"
              onClick={handleSubmitList}
              isLoading={isCardListLoading}
            >
              Submit
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
