import { useRef, useState } from 'react';

import { CarSearchClient, Card } from '../services/cardData';
import useDebounce from '../utils/hooks/useDebounce';

export default function Home() {
  const { current: client } = useRef(new CarSearchClient());

  const [cards, setCards] = useState<Card[]>([]);

  const searchCard = useDebounce(
    async (text: string) => {
      const possibleCards = await client.searchCardName(text);

      setCards(possibleCards);
    },
    [],
    1000
  );

  return (
    <div>
      <input type="text" onChange={e => searchCard(e.target.value)} />

      <ul>
        {cards.map(card => (
          <li key={card.id}>
            <span>{card.mana_cost}</span>
            <span>{card.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
