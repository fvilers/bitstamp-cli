import { promisify } from 'util';
import Bitstamp from 'bitstamp';
import chalk from 'chalk';
import { table } from 'table';
import { asyncWrapper } from '../util';

const bitstamp = new Bitstamp();
const COLORS = {
  'Enabled': chalk.bold.green,
  'Disabled': chalk.bold.red
};
const tradingPairHandler = async () => {
  const data = await promisify(bitstamp.trading_pairs_info)();
  const formatLine = line => {
    const [base, counter] = line.name.split('/');

    return [
      line.name,
      line.url_symbol,
      `${base}: ${line.base_decimals} / ${counter}: ${line.counter_decimals}`,
      line.minimum_order,
      COLORS[line.trading](line.trading),
      line.description
    ];
  };
  const rows = [
    ['Trading pair', 'Parameter symbol', 'Decimal precision', 'Minimum order', 'Trading status', 'Description'],
    ...data.map(formatLine)
  ];

  console.log(table(rows));
};

export const command = 'tradingpairs';
export const description = 'Returns the list of trading pairs.';
export const handler = asyncWrapper(tradingPairHandler);
