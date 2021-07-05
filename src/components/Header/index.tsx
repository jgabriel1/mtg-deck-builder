import {
  Button,
  Container,
  Flex,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { ImportListModal } from '../ImportListModal';

export const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Flex h="24" align="center">
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Heading as="h2">Deck Builder</Heading>

            <Button type="button" colorScheme="blue" size="md" onClick={onOpen}>
              Import
            </Button>
          </Flex>
        </Container>
      </Flex>

      <ImportListModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
