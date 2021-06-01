import { useMutation } from 'react-query';
import { getCardNameAutoComplete } from '../services/cardData';
import { POSSIBLE_CARD_NAMES } from './keys';

export const usePossibleCards = () => {
  const {
    mutate: mutatePossibleCards,
    data: possibleCards,
    reset: resetPossibleCards,
    isLoading: isPossibleCardsLoading,
  } = useMutation({
    mutationKey: POSSIBLE_CARD_NAMES,
    mutationFn: getCardNameAutoComplete,
  });

  return {
    mutatePossibleCards,
    possibleCards,
    resetPossibleCards,
    isPossibleCardsLoading,
  };
};
