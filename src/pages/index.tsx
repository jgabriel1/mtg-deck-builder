import { Box, Container, Flex, HStack, VStack } from '@chakra-ui/react';
import { useDeck } from '../hooks/deck';
import { CardsList } from '../components/CardsList';
import { Header } from '../components/Header';
import { SearchBox } from '../components/SearchBox';
import { CardData } from '../services/cardData';
import { OptionsBar } from '../components/OptionsBar';
import React from 'react';

const Home = () => {
  const { deck, addCard } = useDeck();

  const onSubmitCard = (card: CardData) => {
    addCard(card);
  };

  return (
    <Flex flexDir="column">
      <Header />

      <Container maxW="container.lg">
        <VStack align="flex-start">
          <Flex w="100%" justify="space-between" align="center">
            <Box w="50%">
              <SearchBox onSubmitCard={onSubmitCard} />
            </Box>

            <OptionsBar />
          </Flex>

          <CardsList cards={deck} />
        </VStack>
      </Container>
    </Flex>
  );
};

export default Home;
