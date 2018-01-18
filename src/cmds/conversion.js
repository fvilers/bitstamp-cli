const conversionHandler = () => {
  console.log('Conversion command running');
};

export const command = 'conversion';
export const description = 'Returns the EUR/USD conversion rate';
export const handler = conversionHandler;
