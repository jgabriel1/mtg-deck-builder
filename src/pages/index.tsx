import { useEffect, useState, FormEventHandler, useRef } from 'react';

import {
  getCardDataFromName,
  Card,
  getCardNameAutoComplete,
} from '../services/cardData';
import useDebounce from '../utils/hooks/useDebounce';

export default function Home() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [possibleCards, setPossibleCards] = useState<string[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);

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

    if (selectedCard) setDeck(current => [...current, selectedCard]);
  };

  useEffect(() => {
    if (selectedCard) setPossibleCards([]);
  }, [selectedCard]);

  useEffect(() => {
    if (selectedCard) setSelectedCard(null);
  }, [deck]);

  return (
    <main>
      <form onSubmit={onSubmitCard}>
        <h2>Search</h2>

        <input
          ref={searchInputRef}
          type="text"
          onChange={e => searchCard(e.target.value)}
        />
      </form>

      {possibleCards.length > 0 && (
        <ul>
          {possibleCards.map((cardName, index) => (
            <li key={`cardName:${index}`}>{cardName}</li>
          ))}
        </ul>
      )}

      <h2>Deck</h2>

      <ul>
        {deck.map(card => (
          <li key={card.id}>{`${card.mana_cost} ${card.name}`}</li>
        ))}
      </ul>
    </main>
  );
}
