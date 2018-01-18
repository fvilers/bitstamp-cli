import { promisify } from 'util';
import Bitstamp from 'bitstamp';
import { table } from 'table';
import { SUPPORTED_CURRENCY_PAIRS, TRANSACTION_TYPES } from '../constants';
import { asyncWrapper } from '../util';

const SUPPORTED_TIME = [
  'minute',
  'hour',
  'day'
];
const bitstamp = new Bitstamp();
const transactionsHandler = async (argv) => {
  const { currency_pair, time } = argv;
  const data = await promisify(bitstamp.transactions)(currency_pair, { time });
  const currency = currency_pair
    .slice(0, 3)
    .toLocaleUpperCase();
  const formatLine = line => [
    new Date(line.date * 1000).toLocaleString(),
    line.tid,
    TRANSACTION_TYPES[line.type].toLocaleUpperCase(),
    line.price,
    line.amount
  ];

  const rows = [
    ['Date and time', 'Transaction ID', 'Type', `${currency} price`, `${currency} amount`],
    ...data.map(formatLine)
  ];

  console.log(table(rows));
};

export const command = 'transactions <currency_pair> [time]';
export const description = 'Returns a descending list of transactions for the specified currency pair.';
export const builder = yargs => yargs
  .choices('currency_pair', SUPPORTED_CURRENCY_PAIRS)
  .choices('time', SUPPORTED_TIME);
export const handler = asyncWrapper(transactionsHandler);
