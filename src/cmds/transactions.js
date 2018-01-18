import { promisify } from 'util';
import Bitstamp from 'bitstamp';
import chalk from 'chalk';
import { table } from 'table';
import { SUPPORTED_CURRENCY_PAIRS, TRANSACTION_TYPES } from '../constants';
import { asyncWrapper, dateAndTimeToLocaleString } from '../util';

const SUPPORTED_TIME = [
  'minute',
  'hour',
  'day'
];
const bitstamp = new Bitstamp();
const COLORS = {
  0: chalk.bold.green, // Buy
  1: chalk.bold.red // Sell
};
const transactionsHandler = async (argv) => {
  const { currency_pair, time, line } = argv;
  const data = await promisify(bitstamp.transactions)(currency_pair, { time });
  const currency = currency_pair
    .slice(0, 3)
    .toLocaleUpperCase();
  const formatLine = line => [
    dateAndTimeToLocaleString(line.date * 1000),
    line.tid,
    TRANSACTION_TYPES[line.type].toLocaleUpperCase(),
    COLORS[line.type](line.price),
    COLORS[line.type](line.amount)
  ];

  const rows = [
    ['Date and time', 'Transaction ID', 'Type', `${currency} price`, `${currency} amount`],
    ...data
      .slice(0, line || data.length)
      .map(formatLine)
  ];

  console.log(table(rows));
};

export const command = 'transactions <currency_pair> [time]';
export const description = 'Returns a descending list of transactions for the specified currency pair.';
export const builder = yargs => yargs
  .choices('currency_pair', SUPPORTED_CURRENCY_PAIRS)
  .choices('time', SUPPORTED_TIME)
  .option('l', {
    alias: 'line',
    type: 'number'
  });
export const handler = asyncWrapper(transactionsHandler);
