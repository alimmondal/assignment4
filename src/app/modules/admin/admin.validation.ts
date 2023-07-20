import { z } from 'zod';

const updateAdmin = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    role: z.string().optional(),
    password: z.string().optional(),
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    address: z.string().optional(),
    // profileImage: z.string().optional(),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    // admin: z.object({
    phoneNumber: z.string().optional(),
    role: z.string().optional(),
    password: z.string().optional(),
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    address: z.string().optional(),
    // profileImage: z.string().optional(),
  }),
  // }),
});

const AdminLoginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const AdminRefreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AdminValidation = {
  updateAdmin,
  createAdminZodSchema,
  AdminLoginZodSchema,
  AdminRefreshTokenZodSchema,
};
