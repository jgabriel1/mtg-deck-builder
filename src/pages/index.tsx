import { FunctionComponent } from 'react';
import { Container, Flex, VStack } from '@chakra-ui/layout';

import { useDeck } from '../hooks/deck';

import { CardsList } from '../components/CardsList';
import { Header } from '../components/Header';
import { SearchBox } from '../components/SearchBox';

import { CardData } from '../services/cardData';

const Home: FunctionComponent = () => {
  const { deck, addCard } = useDeck();

  const onSubmitCard = (card: CardData) => {
    addCard(card);
  };

  return (
    <Flex flexDir="column" h="100vh">
      <Header />

      <Container maxW="container.sm">
        <VStack align="flex-start">
          <SearchBox onSubmitCard={onSubmitCard} />

          <CardsList cards={deck} />
        </VStack>
      </Container>
    </Flex>
  );
};

export default Home;
