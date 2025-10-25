import Jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const jwt_password = process.env.jwt_password;
export const auth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if (!header || !jwt_password) {
        res.status(401).json({
            message: "you need to log in"
        });
        return;
    }
    try {
        const decoded = Jwt.verify(header, jwt_password) as JwtPayload;
        (req as any).userId = (decoded as any).id;
        next();
    } catch {
        res.status(401).json({
            message: "you need to log in"
        });
    }
}
