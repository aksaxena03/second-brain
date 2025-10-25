"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
exports.config = {
    db_url: process.env.DB_URL || process.env.MONGODB_URI,
    port: process.env.PORT || 3000,
    jwt_secret: process.env.JWT_SECRET || 'your-secret-key',
    node_env: process.env.NODE_ENV || 'development'
};
exports.default = exports.config;
