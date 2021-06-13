import { useMutation } from 'react-query';
import { getCardsFromList } from '../services/cardData';
import { CARD_LIST_DATA } from './keys';

export const useCardsFromList = () => {
  const {
    mutate: mutateCardsList,
    data: cardsList,
    isLoading: isCardsListLoading,
  } = useMutation({
    mutationKey: CARD_LIST_DATA,
    mutationFn: getCardsFromList,
  });

  return {
    mutateCardsList,
    cardsList,
    isCardsListLoading,
  };
};
