import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    // order: z.object({
    cowId: z.string(),
    sellerId: z
      .string({
        required_error: 'PhoneNumber contact number is required',
      })
      .optional(),
    buyerId: z
      .string({
        required_error: 'Address address is required',
      })
      .optional(),
    price: z.number().optional(),
    IdOfCow: z.string().optional(),
  }),
  // }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
