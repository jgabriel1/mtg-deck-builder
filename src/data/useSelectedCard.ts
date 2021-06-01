import { useMutation } from 'react-query';
import { getCardDataFromName } from '../services/cardData';
import { CARD_DATA } from './keys';

type UseSelectedCardOptions = {
  onCardNotFound: (q: string) => void;
};

export const useSelectedCard = ({ onCardNotFound }: UseSelectedCardOptions) => {
  const {
    mutate: mutateSelectedCard,
    data: selectedCard,
    reset: resetSelectedCard,
    isLoading: isSelectedCardLoading,
  } = useMutation({
    mutationKey: CARD_DATA,
    mutationFn: getCardDataFromName,
    onSuccess: (data, q) => {
      if (data === null) onCardNotFound(q);
    },
  });

  return {
    mutateSelectedCard,
    selectedCard,
    resetSelectedCard,
    isSelectedCardLoading,
  };
};
