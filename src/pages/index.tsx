import { Container, Flex, VStack } from '@chakra-ui/layout';
import { FormEventHandler, useEffect, useState } from 'react';

import { CardsList } from '../components/CardsList';
import { Header } from '../components/Header';
import { SearchBox } from '../components/SearchBox';
import { useDeck } from '../hooks/deck';
import {
  CardData,
  getCardDataFromName,
  getCardNameAutoComplete,
} from '../services/cardData';
import useDebounce from '../utils/hooks/useDebounce';

const Sketch = () => {
  const { deck, addCard } = useDeck();

  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [possibleCards, setPossibleCards] = useState<string[]>([]);

  const searchCard = useDebounce(
    async (text: string) => {
      const exactCard = await getCardDataFromName(text);

      if (exactCard) setSelectedCard(exactCard);
      else {
        const possibleCardNames = await getCardNameAutoComplete(text);

        setPossibleCards(possibleCardNames);
      }
    },
    [],
    1000
  );

  const onSubmitCard: FormEventHandler = e => {
    e.preventDefault();

    if (selectedCard) addCard(selectedCard);
  };

  useEffect(() => {
    if (selectedCard) setPossibleCards([]);
  }, [selectedCard]);

  useEffect(() => {
    if (selectedCard) setSelectedCard(null);
  }, [deck]);

  return (
    <Flex flexDir="column" h="100vh">
      <Header />

      <Container maxW="container.sm">
        <VStack align="flex-start">
          <SearchBox
            onSubmitCard={onSubmitCard}
            possibleCards={possibleCards}
            onChange={e => searchCard(e.target.value)}
          />

          <CardsList cards={deck} />
        </VStack>
      </Container>
    </Flex>
  );
};

export default Sketch;
