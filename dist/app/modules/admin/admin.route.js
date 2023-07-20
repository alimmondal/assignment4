"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.get('/:id', admin_controller_1.AdminController.getSingleAdmin);
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
router.post('/login', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.AdminLoginZodSchema), admin_controller_1.AdminController.loginAdmin);
router.post('/refresh-token', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.AdminRefreshTokenZodSchema), admin_controller_1.AdminController.refreshToken);
router.get('/', admin_controller_1.AdminController.getAllAdmins);
router.delete('/:id', admin_controller_1.AdminController.deleteAdmin);
router.patch('/:id', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateAdmin), admin_controller_1.AdminController.updateAdmin);
exports.AdminRoutes = router;
