const PARSE_COST_REGEX = /\{.*?\}/g;

const splitCosts = (costString: string) => {
  const symbols = [];

  let match: RegExpExecArray | null;
  while ((match = PARSE_COST_REGEX.exec(costString)) !== null) {
    let [value] = match;

    symbols.push(value.replace('{', '').replace('}', '').toLowerCase());
  }

  return symbols;
};

const parseSymbol = (symbol: string) => {
  let classString = 'ms ms-cost ';

  const split = symbol.split('/');

  if (split.length > 1) {
    const isPhyrexian = split[1] === 'p';

    if (isPhyrexian) {
      classString += `ms-${split[0]} ms-p`;
    } else {
      classString += `ms-${split[0]}${split[1]}`;
    }
  } else {
    classString += `ms-${symbol}`;
  }

  return classString;
};

export const parseCostString = (costString: string) => {
  const symbols = splitCosts(costString);

  return symbols.map(parseSymbol);
};
