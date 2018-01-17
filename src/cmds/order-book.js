import { promisify } from 'util';
import Bitstamp from 'bitstamp';
import _ from 'lodash';
import { table } from 'table';
import { SUPPORTED_CURRENCY_PAIRS } from '../constants';
import { asyncWrapper } from '../util';

const bitstamp = new Bitstamp();
const orderBookHandler = async (argv) => {
  const { currency_pair } = argv;
  const data = await promisify(bitstamp.order_book)(currency_pair);
  const empty = ['', ''];
  const formatLine = line => [
    line[0] && line[1] ? line[0] * line[1] : '', // Value
    line[1], line[0], // Bid
    line[2], // Ask
    line[3], // Amount
    line[2] && line[3] ? line[2] * line[3] : '' // value
  ];

  const rows = [
    ['Value', 'Amount', 'Bid', 'Ask', 'Amount', 'Value'],
    ..._
      .zip(data.bids, data.asks)
      .map(line => [...(line[0] || empty), ...(line[1] || empty)])
      .map(formatLine)
  ];

  console.log(table(rows));
};

export const command = 'orderbook <currency_pair>';
export const description = 'Returns data like the ticker call, with the calculated values being from within an hour, for the specified currency pair.';
export const builder = yargs => yargs
  .choices('currency_pair', SUPPORTED_CURRENCY_PAIRS);
export const handler = asyncWrapper(orderBookHandler);
