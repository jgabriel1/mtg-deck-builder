import { FunctionComponent, useRef } from 'react';
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
} from '@chakra-ui/react';
import { parseCardList } from './parseCardList';

import { useDeck } from '../../../hooks/deck';
import { getCardsFromList } from '../../../services/cardData/getCardsFromList';
import { useMutation } from 'react-query';

interface ImportListModalProps extends Omit<ModalProps, 'children'> {}

export const ImportListModal: FunctionComponent<ImportListModalProps> = ({
  ...modalProps
}) => {
  const { setAllCards } = useDeck();

  const pasteListTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitList = async () => {
    const listString = pasteListTextAreaRef.current?.value;

    if (!listString) return;

    const parsedCardsData = parseCardList(listString);

    const fetchedCardsData = await getCardsFromList(
      parsedCardsData.map(card => card.cardName)
    );

    setAllCards(
      fetchedCardsData.map(card => {
        const parsedCard = parsedCardsData.find(c => c.cardName === card.name);

        return {
          quantity: parsedCard?.quantity || 1,
          data: card,
        };
      })
    );

    modalProps.onClose();
  };

  return (
    <Modal {...modalProps}>
      <ModalOverlay />

      <ModalContent bg="gray.800">
        <ModalHeader>Import from list</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Textarea
            ref={pasteListTextAreaRef}
            placeholder={`1 Sol Ring\n10 Mountain\n...`}
            resize="none"
            size="md"
            h="sm"
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmitList}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
