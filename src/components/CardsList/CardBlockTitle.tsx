import { Text, Box, TextProps, HStack } from '@chakra-ui/react';
import { CardType } from '../../types';

interface TitleWithManaSymbolProps extends TextProps {
  manaClassName: string;
}

type CardBlockTitleProps = {
  title: CardType | string;
};

const TitleWithManaSymbol = ({
  manaClassName,
  children,
  ...textProps
}: TitleWithManaSymbolProps) => {
  return (
    <HStack spacing="4" {...textProps}>
      <Box>
        <i className={manaClassName}></i>
      </Box>

      <Text>{children}</Text>
    </HStack>
  );
};

export const CardBlockTitle = ({ title }: CardBlockTitleProps) => {
  switch (title) {
    case CardType.LAND:
      return (
        <TitleWithManaSymbol manaClassName="ms ms-cost ms-land">
          {CardType.LAND}
        </TitleWithManaSymbol>
      );
    case CardType.ARTIFACT:
      return (
        <TitleWithManaSymbol manaClassName="ms ms-cost ms-artifact">
          {CardType.ARTIFACT}
        </TitleWithManaSymbol>
      );
    case CardType.CREATURE:
      return (
        <TitleWithManaSymbol manaClassName="ms ms-cost ms-creature">
          {CardType.CREATURE}
        </TitleWithManaSymbol>
      );
    case CardType.INSTANT:
      return (
        <TitleWithManaSymbol manaClassName="ms ms-cost ms-instant">
          {CardType.INSTANT}
        </TitleWithManaSymbol>
      );
    case CardType.SORCERY:
      return (
        <TitleWithManaSymbol manaClassName="ms ms-cost ms-sorcery">
          {CardType.SORCERY}
        </TitleWithManaSymbol>
      );
    case CardType.ENCHANTMENT:
      return (
        <TitleWithManaSymbol manaClassName="ms ms-cost ms-enchantment">
          {CardType.ENCHANTMENT}
        </TitleWithManaSymbol>
      );
    case CardType.PLANESWALKER:
      return (
        <TitleWithManaSymbol manaClassName="ms ms-cost ms-planeswalker">
          {CardType.PLANESWALKER}
        </TitleWithManaSymbol>
      );
    default:
      return <Text>{title}</Text>;
  }
};
