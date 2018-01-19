import { promisify } from 'util';
import Bitstamp from 'bitstamp';
import { table } from 'table';
import { SUPPORTED_CURRENCY_PAIRS } from '../constants';
import { asyncWrapper, dateAndTimeToLocaleString } from '../util';

const bitstamp = new Bitstamp();
const tickerHandler = async (argv) => {
  const { currency_pair, hourly } = argv;
  const method = hourly ? bitstamp.ticker_hour : bitstamp.ticker;
  const data = await promisify(method)(currency_pair);
  const currency = currency_pair
    .slice(0, 3)
    .toLocaleUpperCase();
  const lastLabel = hourly ? 'Last hour' : 'Last 24 hours';

  const rows = [
    ['Date and time', dateAndTimeToLocaleString(data.timestamp * 1000)],
    [`Last ${currency} price`, data.last],
    [`${lastLabel} price high`, data.high],
    [`${lastLabel} price low`, data.low],
    [`${lastLabel} volume weighted average price`, data.vwap],
    [`${lastLabel} volume`, data.volume],
    ['Highest buy order', data.bid],
    ['Lowest sell order', data.ask],
    [`First price of the ${hourly ? 'hour' : 'day'}`, data.open]
  ];

  console.log(table(rows));
};

export const command = 'ticker <currency_pair>';
export const description = 'Returns data for the specified currency pair.';
export const builder = yargs => yargs
  .choices('currency_pair', SUPPORTED_CURRENCY_PAIRS)
  .option('hourly', {
    alias: 'h',
    type: 'boolean'
  });
export const handler = asyncWrapper(tickerHandler);
