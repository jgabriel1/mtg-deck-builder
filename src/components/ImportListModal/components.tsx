import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';

export const ParseListErrorAlert = () => (
  <Alert status="error" borderRadius="lg" bg="none">
    <AlertIcon />

    <AlertTitle fontSize="sm" fontWeight="semibold" color="red.400">
      Please input a list in the supported format!
    </AlertTitle>
  </Alert>
);

type CardsNotFoundAlertProps = {
  cardsNotFound: string[];
};

export const CardsNotFoundAlert = ({
  cardsNotFound,
}: CardsNotFoundAlertProps) => (
  <Alert
    status="warning"
    borderRadius="lg"
    bg="none"
    pb="0"
    fontSize="sm"
    color="yellow.500"
  >
    <Flex flexDir="column" justify="flex-start" w="100%">
      <Flex flexDir="row" align="center" mb="2">
        <AlertIcon />

        <AlertTitle fontWeight="semibold">
          Some cards were not found:
        </AlertTitle>
      </Flex>

      <OrderedList w="inherit" pl="8" mb="2">
        {cardsNotFound.map(cardName => (
          <ListItem key={`cardsNotFound:${cardName}`}>{cardName}</ListItem>
        ))}
      </OrderedList>

      <AlertDescription>
        Would you like to submit the rest of the cards?
      </AlertDescription>
    </Flex>
  </Alert>
);
