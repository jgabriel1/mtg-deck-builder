import { Container, Flex, VStack } from '@chakra-ui/layout';

import { CardsList } from '../components/CardsList';
import { Header } from '../components/Header';
import { SearchBox } from '../components/SearchBox';

const Sketch = () => {
  return (
    <Flex flexDir="column" h="100vh">
      <Header />

      <Container maxW="container.sm">
        <VStack align="flex-start">
          <SearchBox />

          <CardsList />
        </VStack>
      </Container>
    </Flex>
  );
};

export default Sketch;
