import { createContext, FunctionComponent, useContext, useState } from 'react';
import { CardData } from '../services/cardData';

type Card = {
  data: CardData;
  quantity: number;
};

type DeckContextData = {
  deck: Card[];
  addCard: (cardData: CardData) => void;
  removeCard: (cardId: string) => void;
  addAllCardsToDeck: (cards: Card[]) => void;
};

const DeckContext = createContext({} as DeckContextData);

export const DeckProvider: FunctionComponent = ({ children }) => {
  const [deck, setDeck] = useState<Card[]>([]);

  const addCard = (cardData: CardData) => {
    const cardAlreadyIn = deck.find(card => card.data.id === cardData.id);

    if (cardAlreadyIn)
      setDeck(current =>
        current.map(card =>
          card.data.id === cardAlreadyIn.data.id
            ? { ...cardAlreadyIn, quantity: cardAlreadyIn.quantity + 1 }
            : card
        )
      );
    else setDeck(current => [...current, { data: cardData, quantity: 1 }]);
  };

  const removeCard = (cardId: string) => {
    setDeck(current => current.filter(card => card.data.id !== cardId));
  };

  const addAllCardsToDeck = (cards: Card[]) => {
    setDeck(cards);
  };

  return (
    <DeckContext.Provider
      value={{ deck, addCard, removeCard, addAllCardsToDeck }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => useContext(DeckContext);
