import { SUPPORTED_CURRENCY_PAIRS } from '../constants';

const orderBookHandler = (argv) => {
  console.log('order book command running', argv);
};

export const command = 'orderbook <currency_pair>';
export const description = 'Returns data like the ticker call, with the calculated values being from within an hour, for the specified currency pair.';
export const builder = yargs => yargs
  .choices('currency_pair', SUPPORTED_CURRENCY_PAIRS);
export const handler = orderBookHandler;
