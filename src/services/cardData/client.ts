import axios from 'axios';
import rateLimit from 'axios-rate-limit';

export const client = rateLimit(
  axios.create({
    baseURL: 'https://api.scryfall.com',
  }),
  { perMilliseconds: 50, maxRPS: 10 }
);
