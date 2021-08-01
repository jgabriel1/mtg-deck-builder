import axios from 'axios';
import { NextApiHandler } from 'next';
import { parseHTML } from 'linkedom';

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

  const priceValue = priceString
    ? Number(priceString.replace('R$ ', '').replace(',', '.'))
    : 0;

  return res.json({
    name: cardName,
    text: priceString,
    value: priceValue,
  });
};

export default liga;
