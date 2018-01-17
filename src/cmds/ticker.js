import { SUPPORTED_CURRENCY_PAIRS } from '../constants';

const tickerHandler = (yargs) => {
  console.log('ticker command is running', yargs);
};

export const command = 'ticker <currency_pair>';
export const description = 'Returns data for the specified currency pair.';
export const builder = yargs => yargs
  .choices('currency_pair', SUPPORTED_CURRENCY_PAIRS);
export const handler = tickerHandler;
