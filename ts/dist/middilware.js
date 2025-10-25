"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_password = process.env.jwt_password;
const auth = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header || !jwt_password) {
        res.status(401).json({
            message: "you need to log in"
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(header, jwt_password);
        req.userId = decoded.id;
        next();
    }
    catch (_a) {
        res.status(401).json({
            message: "you need to log in"
        });
    }
};
exports.auth = auth;
