import chalk from 'chalk';
import { table } from 'table';

const COLORS = {
  'Enabled': chalk.bold.green,
  'Disabled': chalk.bold.red
};
const tradingPairHandler = () => {
  const data = [{ 'base_decimals': 8, 'minimum_order': '5.0 USD', 'name': 'LTC/USD', 'counter_decimals': 2, 'trading': 'Enabled', 'url_symbol': 'ltcusd', 'description': 'Litecoin / U.S. dollar' }, { 'base_decimals': 8, 'minimum_order': '5.0 USD', 'name': 'ETH/USD', 'counter_decimals': 2, 'trading': 'Enabled', 'url_symbol': 'ethusd', 'description': 'Ether / U.S. dollar' }, { 'base_decimals': 8, 'minimum_order': '5.0 EUR', 'name': 'XRP/EUR', 'counter_decimals': 5, 'trading': 'Enabled', 'url_symbol': 'xrpeur', 'description': 'XRP / Euro' }, { 'base_decimals': 8, 'minimum_order': '5.0 USD', 'name': 'BCH/USD', 'counter_decimals': 2, 'trading': 'Enabled', 'url_symbol': 'bchusd', 'description': 'Bitcoin Cash / U.S. dollar' }, { 'base_decimals': 8, 'minimum_order': '5.0 EUR', 'name': 'BCH/EUR', 'counter_decimals': 2, 'trading': 'Enabled', 'url_symbol': 'bcheur', 'description': 'Bitcoin Cash / Euro' }, { 'base_decimals': 8, 'minimum_order': '5.0 EUR', 'name': 'BTC/EUR', 'counter_decimals': 2, 'trading': 'Enabled', 'url_symbol': 'btceur', 'description': 'Bitcoin / Euro' }, { 'base_decimals': 8, 'minimum_order': '0.001 BTC', 'name': 'XRP/BTC', 'counter_decimals': 8, 'trading': 'Enabled', 'url_symbol': 'xrpbtc', 'description': 'XRP / Bitcoin' }, { 'base_decimals': 5, 'minimum_order': '5.0 USD', 'name': 'EUR/USD', 'counter_decimals': 5, 'trading': 'Enabled', 'url_symbol': 'eurusd', 'description': 'Euro / U.S. dollar' }, { 'base_decimals': 8, 'minimum_order': '0.001 BTC', 'name': 'BCH/BTC', 'counter_decimals': 8, 'trading': 'Enabled', 'url_symbol': 'bchbtc', 'description': 'Bitcoin Cash / Bitcoin' }, { 'base_decimals': 8, 'minimum_order': '5.0 EUR', 'name': 'LTC/EUR', 'counter_decimals': 2, 'trading': 'Enabled', 'url_symbol': 'ltceur', 'description': 'Litecoin / Euro' }, { 'base_decimals': 8, 'minimum_order': '5.0 USD', 'name': 'BTC/USD', 'counter_decimals': 2, 'trading': 'Enabled', 'url_symbol': 'btcusd', 'description': 'Bitcoin / U.S. dollar' }, { 'base_decimals': 8, 'minimum_order': '0.001 BTC', 'name': 'LTC/BTC', 'counter_decimals': 8, 'trading': 'Enabled', 'url_symbol': 'ltcbtc', 'description': 'Litecoin / Bitcoin' }, { 'base_decimals': 8, 'minimum_order': '5.0 USD', 'name': 'XRP/USD', 'counter_decimals': 5, 'trading': 'Enabled', 'url_symbol': 'xrpusd', 'description': 'XRP / U.S. dollar' }, { 'base_decimals': 8, 'minimum_order': '0.001 BTC', 'name': 'ETH/BTC', 'counter_decimals': 8, 'trading': 'Enabled', 'url_symbol': 'ethbtc', 'description': 'Ether / Bitcoin' }, { 'base_decimals': 8, 'minimum_order': '5.0 EUR', 'name': 'ETH/EUR', 'counter_decimals': 2, 'trading': 'Enabled', 'url_symbol': 'etheur', 'description': 'Ether / Euro' }];
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
export const handler = tradingPairHandler;
