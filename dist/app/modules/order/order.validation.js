"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        // order: z.object({
        cowId: zod_1.z.string(),
        sellerId: zod_1.z
            .string({
            required_error: 'PhoneNumber contact number is required',
        })
            .optional(),
        buyerId: zod_1.z
            .string({
            required_error: 'Address address is required',
        })
            .optional(),
        price: zod_1.z.number().optional(),
        IdOfCow: zod_1.z.string().optional(),
    }),
    // }),
});
exports.OrderValidation = {
    createOrderZodSchema,
};
