import { promisify } from 'util';
import Bitstamp from 'bitstamp';
import { SUPPORTED_CURRENCY_PAIRS } from '../constants';
import { asyncWrapper } from '../util';

const bitstamp = new Bitstamp();

const tickerHandler = async (argv) => {
  const { currency_pair } = argv;
  const result = await promisify(bitstamp.ticker)(currency_pair);

  console.log(result);
};

export const command = 'ticker <currency_pair>';
export const description = 'Returns data for the specified currency pair.';
export const builder = yargs => yargs
  .choices('currency_pair', SUPPORTED_CURRENCY_PAIRS);
export const handler = asyncWrapper(tickerHandler);
