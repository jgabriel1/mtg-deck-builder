import { useMutation } from 'react-query';
import { getCardsFromList } from '../services/cardData';
import { CARD_LIST_DATA } from './keys';

export const useCardList = () => {
  const {
    mutate: mutateCardList,
    data: cardList,
    isLoading: isCardListLoading,
  } = useMutation({
    mutationKey: CARD_LIST_DATA,
    mutationFn: getCardsFromList,
  });

  return {
    mutateCardList,
    cardList,
    isCardListLoading,
  };
};
