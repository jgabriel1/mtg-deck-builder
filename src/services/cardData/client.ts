import axios from 'axios';

export const createClient = () =>
  axios.create({
    baseURL: 'https://api.scryfall.com',
  });

export const createImageClient = () =>
  axios.create({
    baseURL: 'http://c2.scryfall.com',
  });
