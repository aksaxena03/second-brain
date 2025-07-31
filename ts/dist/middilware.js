"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const auth = (req, res, next) => {
    const header = req.headers["authorization"];
    const decode = jsonwebtoken_1.default.verify(header, config_1.jwt_password);
    // console.log(header ,decode)
    if (decode) {
        //@ts-ignore
        req.userId = (decode.id);
        // console.log(decode.id)
        next();
    }
    else {
        res.status(401).json({
            message: "you need to log in"
        });
    }
};
exports.auth = auth;
