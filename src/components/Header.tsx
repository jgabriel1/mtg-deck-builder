import { Container, Flex, Heading } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Flex h="20" align="center" bg="blue.900">
      <Container maxW="container.md">
        <Heading as="h2" color="white">
          Deck Builder
        </Heading>
      </Container>
    </Flex>
  );
};
