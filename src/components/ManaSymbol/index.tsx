import { FunctionComponent, memo } from 'react';
import { Flex, HStack } from '@chakra-ui/react';

import { parseCostString } from './parseCostString';

type ManaSymbolProps = {
  costString: string;
};

export const ManaSymbol: FunctionComponent<ManaSymbolProps> = memo(
  ({ costString }) => {
    const costClasses = parseCostString(costString);

    return (
      <Flex justify="flex-end" align="center" fontSize="sm">
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
  (old, _new) => old.costString === _new.costString
);
