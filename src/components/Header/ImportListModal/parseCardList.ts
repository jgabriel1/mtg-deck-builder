export class ParseListError extends Error {}

export const parseCardList = (listString: string) => {
  try {
    // Split lines on breaks
    const lines = listString.split('\n');

    // Separate quantity and card name
    return lines.map(line => {
      const firstWhitespaceIndex = line.indexOf(' ');
      const quantity = Number(line.substr(0, firstWhitespaceIndex));
      const cardName = line.substr(firstWhitespaceIndex + 1);

      return {
        quantity,
        cardName,
      };
    });
  } catch (err) {
    throw new ParseListError(err);
  }
};
