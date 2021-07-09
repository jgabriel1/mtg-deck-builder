import { Button, Grid, GridItem, Text } from '@chakra-ui/react';
import { CardImagePopover } from './CardImagePopover';
import { ManaSymbol } from '../ManaSymbol';

type CardItemProps = {
  quantity?: number;
  name: string;
  mana_cost?: string;
  imageUrl: string;
};

export const CardItem = ({
  name,
  mana_cost = '',
  quantity = 1,
  imageUrl,
}: CardItemProps) => {
  return (
    <CardImagePopover imageUrl={imageUrl}>
      <Button
        w="100%"
        variant="ghost"
        fontWeight="normal"
        size="sm"
        fontSize="sm"
      >
        <Grid templateColumns="repeat(16, 1fr)" gap="2" w="100%">
          <GridItem colSpan={1}>
            <Text textAlign="start">{quantity}</Text>
          </GridItem>

          <GridItem colSpan={12}>
            <Text textAlign="start" textOverflow="ellipsis">
              {name}
            </Text>
          </GridItem>

          <GridItem colSpan={3}>
            <ManaSymbol costString={mana_cost} fontSize="xs" />
          </GridItem>
        </Grid>
      </Button>
    </CardImagePopover>
  );
};
