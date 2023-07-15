"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const updateAdmin = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        }),
        address: zod_1.z.string().optional(),
        // profileImage: z.string().optional(),
    }),
});
const creatAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        admin: zod_1.z.object({
            phoneNumber: zod_1.z.string().optional(),
            role: zod_1.z.string().optional(),
            password: zod_1.z.string().optional(),
            name: zod_1.z.object({
                firstName: zod_1.z.string().optional(),
                lastName: zod_1.z.string().optional(),
            }),
            address: zod_1.z.string().optional(),
            // profileImage: z.string().optional(),
        }),
    }),
});
const AdminLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'ID is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const AdminRefreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AdminValidation = {
    updateAdmin,
    creatAdminZodSchema,
    AdminLoginZodSchema,
    AdminRefreshTokenZodSchema,
};
