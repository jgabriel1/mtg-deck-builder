import { Box, Img, Text } from '@chakra-ui/react';
import { CardImagePopover } from '../CardImagePopover';

type CardImageItemProps = {
  imageUrl: string;
  quantity: number;
};

export const CardImageItem = ({ imageUrl, quantity }: CardImageItemProps) => {
  return (
    <CardImagePopover imageUrl={imageUrl} placement="auto-end">
      <Box mt="-24" position="relative">
        {quantity > 1 && (
          <Box
            bg="gray.900"
            position="absolute"
            top="12.5%"
            right="10%"
            px="5%"
            borderRadius="md"
          >
            <Text fontSize="sm">{`x${quantity}`}</Text>
          </Box>
        )}

        <Img src={imageUrl} maxW="128" objectFit="contain" borderRadius="lg" />
      </Box>
    </CardImagePopover>
  );
};
