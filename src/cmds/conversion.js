import { promisify } from 'util';
import Bitstamp from 'bitstamp';
import { table } from 'table';
import { asyncWrapper } from '../util';

const bitstamp = new Bitstamp();
const conversionHandler = async () => {
  const data = await promisify(bitstamp.eur_usd)();

  const rows = [
    ['', 'EUR', 'USD'],
    ['Buy', 1, data.buy],
    ['Sell', data.sell, 1]
  ];

  console.log(table(rows));
};

export const command = 'conversion';
export const description = 'Returns the EUR/USD conversion rate';
export const handler = asyncWrapper(conversionHandler);
