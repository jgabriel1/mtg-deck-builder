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

export const CardImagePopover = ({
  children,
  imageUrl,
  ...rest
}: CardImagePopoverProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Popover placement="right" {...rest} isOpen={isOpen}>
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
