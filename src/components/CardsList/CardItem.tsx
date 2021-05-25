import { Button, Flex, Grid, GridItem, ListItem, Text } from '@chakra-ui/react';

type CardItemProps = {
  name: string;
  quantity?: number;
  mana_cost?: string;
};

export const CardItem = ({
  name,
  mana_cost = '',
  quantity = 1,
}: CardItemProps) => {
  return (
    <ListItem>
      <Button w="100%" variant="ghost" fontWeight="normal" fontSize="lg">
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
            <Text textAlign="end">{mana_cost}</Text>
          </GridItem>
        </Grid>
      </Button>
    </ListItem>
  );
};
