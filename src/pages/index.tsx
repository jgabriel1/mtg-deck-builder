import { useState } from 'react';

import { getCardDataFromName, Card } from '../services/cardData';
import useDebounce from '../utils/hooks/useDebounce';

export default function Home() {
  const [card, setCard] = useState<Card>();

  const searchCard = useDebounce(
    async (text: string) => {
      const possibleCard = await getCardDataFromName(text);

      possibleCard && setCard(possibleCard);
    },
    [],
    1000
  );

  return (
    <div>
      <input type="text" onChange={e => searchCard(e.target.value)} />

      <div>{card?.name}</div>
    </div>
  );
}
