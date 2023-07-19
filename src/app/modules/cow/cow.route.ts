import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';
const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  CowController.getSingleCow
);

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  CowController.createCow
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  CowController.getAllCows
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  CowController.deleteCow
);

router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  CowController.updateCow
);

export const CowRoutes = router;
