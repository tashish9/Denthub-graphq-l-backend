import express from 'express';
const getOrders = (req: express.Request, res: express.Response) => {
  console.log('List of all the Orders is here');
  res.end('Orders list');
};

export { getOrders };
