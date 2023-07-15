import { z } from 'zod';
import { breed, category, label, location } from './cow.constant';

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string({}),
    age: z.number().optional(),
    price: z.number().optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    user: z.string().optional(),
  }),
});

const createCowZodSchema = z.object({
  body: z.object({
    cow: z.object({
      name: z.string({}),
      age: z.number().optional(),
      price: z.number().optional(),
      category: z.enum([...category] as [string, ...string[]]),
      label: z.enum([...label] as [string, ...string[]]),
      breed: z.enum([...breed] as [string, ...string[]]),
      location: z.enum([...location] as [string, ...string[]]).optional(),
      // user: z.string().optional(),
    }),
  }),
});

export const CowValidation = {
  updateCowZodSchema,
  createCowZodSchema,
};
