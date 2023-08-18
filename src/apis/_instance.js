import { default as Axios } from 'axios';

import CONFIG from './_config';

const CLIENT = Axios.create({
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default CLIENT;
