import { memo } from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import { Property } from 'csstype';

import { parseCostString } from './parseCostString';

interface ManaSymbolProps {
  costString: string;
  fontSize?: Property.FontSize;
}

export const ManaSymbol = memo(
  ({ costString, fontSize = 'xs' }: ManaSymbolProps) => {
    const costClasses = parseCostString(costString);

    return (
      <Flex justify="flex-end" align="center" fontSize={fontSize}>
        <HStack spacing="2px">
          {costClasses.map((costClass, index) => (
            <i
              key={`manaCost:${costString}:${index}`}
              className={costClass}
            ></i>
          ))}
        </HStack>
      </Flex>
    );
  },
  (old, _new) =>
    old.costString === _new.costString || old.fontSize === _new.fontSize
);
