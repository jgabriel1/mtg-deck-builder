import { useMemo } from 'react';
import { separators } from './util';
import { CardBlockData, CardItemData } from '../../types';
import { useListOptions } from '../../hooks/listOptions';
import { CardNamesList } from './CardNamesView';
import { CardImagesList } from './CardImagesView';

type CardsListProps = {
  cards: CardItemData[];
};

export const CardsList = ({ cards }: CardsListProps) => {
  const { options } = useListOptions();

  const blocks = useMemo<CardBlockData[]>(() => {
    return separators.separateBy(options.groupMode, cards);
  }, [cards, options.groupMode]);

  return (
    <>
      {options.displayMode === 'VISUAL' ? (
        <CardImagesList blocks={blocks} />
      ) : (
        <CardNamesList blocks={blocks} />
      )}
    </>
  );
};
