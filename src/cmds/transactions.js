import { SUPPORTED_CURRENCY_PAIRS } from '../constants';

const transactionsHandler = (argv) => {
  console.log('transactions command running', argv);
};

export const command = 'transactions <currency_pair>';
export const description = 'Returns a descending list of transactions for the specified currency pair.';
export const builder = yargs => yargs
  .choices('currency_pair', SUPPORTED_CURRENCY_PAIRS);
export const handler = transactionsHandler;
