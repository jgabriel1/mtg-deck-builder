import { FunctionComponent } from 'react';
import { Container, Divider, Heading } from '@chakra-ui/react';

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
    <Container>
      <Heading size="md" fontWeight="semibold" mb="4">
        {title}
      </Heading>

      {children}

      {!isLast && <Divider mt="4" mb="8" borderColor="gray.400" />}
    </Container>
  );
};
