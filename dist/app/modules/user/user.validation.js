"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            role: zod_1.z.enum([...user_constant_1.role]).optional(),
            password: zod_1.z.string().optional(),
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            phoneNumber: zod_1.z.string({
                required_error: 'PhoneNumber contact number is required',
            }),
            address: zod_1.z.string({
                required_error: 'Address address is required',
            }),
            budget: zod_1.z.number({
                required_error: 'Budget budget is required',
            }),
            income: zod_1.z.number({
                required_error: 'Income  is required',
            }),
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        // user: z.object({
        password: zod_1.z.string().optional().optional(),
        role: zod_1.z.enum([...user_constant_1.role]).optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        }),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
    // }),
});
exports.UserValidation = {
    updateUserZodSchema,
    createUserZodSchema,
};
