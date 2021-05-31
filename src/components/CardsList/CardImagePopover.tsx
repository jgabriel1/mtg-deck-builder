import {
  Box,
  Image,
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface CardImagePopoverProps extends PopoverProps {
  imageUrl: string;
}

export const CardImagePopover: FunctionComponent<CardImagePopoverProps> = ({
  children,
  imageUrl,
  ...rest
}) => {
  return (
    <Popover {...rest} placement="right">
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent w="inherit" bg="inherit" maxW="256" border="none">
        <Box borderRadius="xl">
          <Image src={imageUrl} objectFit="contain" borderRadius="xl" />
        </Box>
      </PopoverContent>
    </Popover>
  );
};
