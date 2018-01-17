const tickerHandler = () => {
  console.log('ticker command is running');
};

export const command = 'ticker <currency_pair>';
export const description = 'Returns data for the specified currency pair.';
export const handler = tickerHandler;
