import { FunctionComponent, useState } from 'react';
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
import { useCardList } from '../../../data/useCardList';

interface ImportListModalProps extends Omit<ModalProps, 'children'> {}

export const ImportListModal: FunctionComponent<ImportListModalProps> = ({
  ...modalProps
}) => {
  const { setAllCards } = useDeck();

  const { mutateCardList, isCardListLoading } = useCardList();

  const [listString, setListString] = useState('');

  const handleSubmitList = async () => {
    const parsedCardsData = parseCardList(listString);

    mutateCardList(
      parsedCardsData.map(card => card.cardName),
      {
        onSuccess: fetchedCardsData => {
          setAllCards(
            fetchedCardsData.map(card => ({
              quantity:
                parsedCardsData.find(c => c.cardName === card.name)?.quantity ||
                1,
              data: card,
            }))
          );

          modalProps.onClose();
        },
      }
    );
  };

  return (
    <Modal {...modalProps}>
      <ModalOverlay />

      <ModalContent bg="gray.800">
        <ModalHeader>Import from list</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Textarea
            value={listString}
            onChange={e => setListString(e.target.value)}
            placeholder={`1 Sol Ring\n10 Mountain\n...`}
            resize="none"
            size="md"
            h="sm"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleSubmitList}
            isLoading={isCardListLoading}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
