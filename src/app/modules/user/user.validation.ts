import { z } from 'zod';
import { role } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.enum([...role] as [string, ...string[]]).optional(),
      password: z.string().optional(),
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      phoneNumber: z.string({
        required_error: 'PhoneNumber contact number is required',
      }),
      address: z.string({
        required_error: 'Address address is required',
      }),
      budget: z.number({
        required_error: 'Budget budget is required',
      }),
      income: z.number({
        required_error: 'Income  is required',
      }),
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    // user: z.object({
    password: z.string().optional().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
  // }),
});

export const UserValidation = {
  updateUserZodSchema,
  createUserZodSchema,
};
