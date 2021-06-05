import { FunctionComponent } from 'react';
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

interface ImportListModalProps extends Omit<ModalProps, 'children'> {}

export const ImportListModal: FunctionComponent<ImportListModalProps> = ({
  ...rest
}) => {
  return (
    <Modal {...rest}>
      <ModalOverlay />

      <ModalContent bg="gray.800">
        <ModalHeader>Import from list</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Textarea
            placeholder={`1 Sol Ring\n10 Mountain\n...`}
            resize="none"
            size="lg"
            h="md"
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
