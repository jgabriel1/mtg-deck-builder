import axios from 'axios';
import { NextApiHandler } from 'next';
import { parseHTML } from 'linkedom';
import currency from 'currency.js';

const ligaClient = axios.create({
  baseURL: 'https://www.ligamagic.com.br',
});

const liga: NextApiHandler = async (req, res) => {
  const cardName = req.query.cardName as string;

  const urlSafeCardName = encodeURIComponent(cardName);

  const { data } = await ligaClient.get(
    `/?view=cards/card&card=${urlSafeCardName}`
  );

  const { document } = parseHTML(data);

  const priceString = document.querySelector(
    'div.col-prc.col-prc-menor'
  )?.textContent;

  const price = currency(priceString || 0, {
    symbol: 'R$',
    decimal: ',',
    separator: '.',
    pattern: '! #',
    errorOnInvalid: false,
  });

  return res.json({
    name: cardName,
    text: price.format(),
    value: price.value,
  });
};

export default liga;
