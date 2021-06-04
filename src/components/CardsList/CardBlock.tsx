import { FunctionComponent } from 'react';
import { Divider, Heading, VStack } from '@chakra-ui/react';

type CardBlockProps = {
  title: string;
  isLast?: boolean;
};

export const CardBlock: FunctionComponent<CardBlockProps> = ({
  children,
  title,
  isLast,
}) => {
  return (
    <VStack>
      <Heading>{title}</Heading>

      {children}

      {!isLast && <Divider />}
    </VStack>
  );
};
