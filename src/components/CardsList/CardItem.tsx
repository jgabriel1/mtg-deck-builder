import {
  Button,
  Grid,
  GridItem,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

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
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <ListItem>
      <CardImagePopover imageUrl={imageUrl} isOpen={isOpen}>
        <Button
          w="100%"
          variant="ghost"
          fontWeight="normal"
          fontSize="lg"
          colorScheme="whiteAlpha"
          color="gray.100"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <Grid templateColumns="repeat(16, 1fr)" gap="2" w="100%">
            <GridItem colSpan={1}>
              <Text textAlign="start">{quantity}</Text>
            </GridItem>

            <GridItem colSpan={12}>
              <Text textAlign="start" overflow="clip">
                {name}
              </Text>
            </GridItem>

            <GridItem colSpan={3}>
              <ManaSymbol costString={mana_cost} />
            </GridItem>
          </Grid>
        </Button>
      </CardImagePopover>
    </ListItem>
  );
};
