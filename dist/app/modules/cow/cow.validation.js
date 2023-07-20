"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({}).optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        category: zod_1.z.enum([...cow_constant_1.category]).optional(),
        label: zod_1.z.enum([...cow_constant_1.label]).optional(),
        breed: zod_1.z.enum([...cow_constant_1.breed]).optional(),
        location: zod_1.z.enum([...cow_constant_1.location]).optional(),
        user: zod_1.z.string().optional(),
    }),
});
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        // cow: z.object({
        name: zod_1.z.string({}),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        category: zod_1.z.enum([...cow_constant_1.category]),
        label: zod_1.z.enum([...cow_constant_1.label]),
        breed: zod_1.z.enum([...cow_constant_1.breed]),
        location: zod_1.z.enum([...cow_constant_1.location]).optional(),
        // user: z.string().optional(),
    }),
    // }),
});
exports.CowValidation = {
    updateCowZodSchema,
    createCowZodSchema,
};
