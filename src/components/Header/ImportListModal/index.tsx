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
  HStack,
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
} from '@chakra-ui/react';
import { parseCardList } from './parseCardList';

import { useDeck } from '../../../hooks/deck';
import { useCardList } from '../../../data/useCardList';
import { ParseListError } from './ParseListError';

interface ImportListModalProps extends Omit<ModalProps, 'children'> {}

export const ImportListModal: FunctionComponent<ImportListModalProps> = ({
  ...modalProps
}) => {
  const { setAllCards } = useDeck();

  const { mutateCardList, isCardListLoading } = useCardList();

  const [listString, setListString] = useState('');

  const [isParseListError, setIsParseListError] = useState(false);

  const onChangeListInput: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const { value } = e.target;

    setListString(value);
  };

  const handleSubmitList = async () => {
    try {
      const parsedCardsData = parseCardList(listString);

      mutateCardList(
        parsedCardsData.map(card => card.cardName),
        {
          onSuccess: ({ cards, notFound }) => {
            setAllCards(
              cards.map(card => ({
                quantity:
                  parsedCardsData.find(c => c.cardName === card.name)
                    ?.quantity || 1,
                data: card,
              }))
            );

            modalProps.onClose();
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
    };
  }, [modalProps.isOpen]);

  useEffect(() => {
    setIsParseListError(false);
  }, [listString]);

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
          <HStack>
            <VStack>
              {isParseListError && (
                <Alert status="error" borderRadius="lg" bg="none">
                  <AlertIcon />

                  <AlertTitle fontSize="sm" fontWeight="medium" color="red.400">
                    Please input a list in the supported format.
                  </AlertTitle>
                </Alert>
              )}
            </VStack>

            <Button
              colorScheme="blue"
              onClick={handleSubmitList}
              isLoading={isCardListLoading}
            >
              Submit
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
