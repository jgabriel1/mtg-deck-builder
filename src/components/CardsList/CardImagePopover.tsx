import { FunctionComponent } from 'react';
import {
  Box,
  Image,
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

interface CardImagePopoverProps extends PopoverProps {
  imageUrl: string;
}

export const CardImagePopover: FunctionComponent<CardImagePopoverProps> = ({
  children,
  imageUrl,
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Popover {...rest} placement="right" isOpen={isOpen}>
      <PopoverTrigger>
        <Box onMouseEnter={onOpen} onMouseLeave={onClose}>
          {children}
        </Box>
      </PopoverTrigger>

      <PopoverContent w="inherit" bg="inherit" maxW="256" border="none">
        <Box borderRadius="xl">
          <Image src={imageUrl} objectFit="contain" borderRadius="xl" />
        </Box>
      </PopoverContent>
    </Popover>
  );
};
