"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowFilterableFields = exports.cowSearchableFields = exports.label = exports.category = exports.location = exports.breed = void 0;
exports.breed = [
    'Brahman',
    'Nellore',
    'Sahi',
    'Gir',
    'Indigenous',
    'Tharparkar',
    'Kankrej',
];
exports.location = [
    'Dhaka',
    'Chitagong',
    'Barishal',
    'Rajshahi',
    'Sylhet',
    'Comilla',
    'Rangpur',
    'Mymenshing',
    'Khulna',
];
exports.category = ['Dairy', 'Beef', 'Dual Purpose'];
exports.label = ['for sale', 'sold out'];
exports.cowSearchableFields = [
    'label',
    'location',
    'category',
    'label',
    'name',
    'name.firstName',
    'breed',
    'price',
];
exports.cowFilterableFields = [
    'searchTerm',
    'label',
    'location',
    'category',
    'breed',
    'name',
    'price',
];
