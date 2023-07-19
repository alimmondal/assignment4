"use strict";
/* eslint-disable no-console */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const createOrder = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const cow = yield cow_model_1.Cow.findById(cowId).session(session);
        console.log('CowId', cow === null || cow === void 0 ? void 0 : cow.price);
        // Check if the cow is still available for sale
        if (!cow || cow.label !== 'for sale') {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow not available');
        }
        const user = yield user_model_1.User.findById(buyerId).session(session);
        console.log(user);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid buyer ID.');
        }
        // Check if the buyer has enough money to buy the cow
        if (user.budget < cow.price) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient funds to buy the cow');
        }
        // Deduct the cow's price from the buyer's budget and update the buyer's document
        user.budget -= cow.price;
        yield user.save({ session });
        // Update the cow's status to 'sold out'
        cow.label = 'sold out';
        yield cow.save({ session });
        // const { price, _id } = cow;
        // Add an entry to the orders collection
        const order = yield order_model_1.Order.create([
            {
                IdOfCow: cow._id,
                buyerId: user._id,
                sellerId: cow.user,
                price: cow.price,
            },
        ], { session });
        // Transfer money from the buyer's account to the seller's account
        const seller = yield user_model_1.User.findById(cow.user).session(session);
        console.log('Seller', seller);
        if (!seller) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid buyer ID.');
        }
        seller.income += cow.price;
        yield seller.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return order ? order[0] : null;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({});
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
