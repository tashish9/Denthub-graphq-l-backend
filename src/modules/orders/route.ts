import { Router } from 'express';
import { getOrders } from './controllers';

export const initialiseOrdersRoutes = (router: Router) => {
  router.get('/orders', getOrders);
};
