const tradingPairHandler = (argv) => {
  console.log('Trading pairs command running', argv);
};

export const command = 'tradingpairs';
export const description = 'Returns the list of trading pairs.';
export const handler = tradingPairHandler;
