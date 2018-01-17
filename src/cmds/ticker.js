import { promisify } from 'util';
import Bitstamp from 'bitstamp';
import { table } from 'table';
import { SUPPORTED_CURRENCY_PAIRS } from '../constants';
import { asyncWrapper } from '../util';

const bitstamp = new Bitstamp();
const tickerHandler = async (argv) => {
  const { currency_pair } = argv;
  const data = await promisify(bitstamp.ticker)(currency_pair);
  const currency = currency_pair
    .slice(0, 3)
    .toLocaleUpperCase();

  const rows = [
    ['Date and time', new Date(data.timestamp * 1000).toLocaleString()],
    [`Last ${currency} price`, data.last],
    ['Last 24 hours price high', data.high],
    ['Last 24 hours price low', data.low],
    ['Last 24 hours volume weighted average price', data.vwap],
    ['Last 24 hours volume', data.volume],
    ['Highest buy order', data.bid],
    ['Lowest sell order', data.ask],
    ['First price of the day', data.open]
  ];

  console.log(table(rows));
};

export const command = 'ticker <currency_pair>';
export const description = 'Returns data for the specified currency pair.';
export const builder = yargs => yargs
  .choices('currency_pair', SUPPORTED_CURRENCY_PAIRS);
export const handler = asyncWrapper(tickerHandler);
