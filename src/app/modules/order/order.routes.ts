import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import { OrderController } from './order.controller';
const router = express.Router();

router.post(
  '/',
  // validateRequest(OrderValidation.createOrderZodSchema),
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  OrderController.createOrders
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  OrderController.getAllOrders
);

export const OrderRoutes = router;
