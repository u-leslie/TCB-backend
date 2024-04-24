// import { NextFunction, Request, Response } from "express";
// import { verifyToken } from "../utils/jwt";
// import { IResponse } from "../types/IResponse";
// import { IJwtPayload } from "../types/IJwtPayload";

// export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
//     try {
//         const token = req.headers.authorization;
//         if (!token) throw new Error("Auth token not provided")
//         const decodedToken = await verifyToken<IJwtPayload>(token as string)
//         req.user = decodedToken.payload as IJwtPayload
//         next()
//     } catch (error: any) {
//         return res.status(401).send(new IResponse(error.message, false))
//     }

// }

import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { IResponse } from "../types/IResponse";
import { IJwtPayload } from "../types/IJwtPayload";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        if (!token) throw new Error("Auth token not provided");

        const decodedToken = await verifyToken<IJwtPayload>(token as string);

        // Use type assertion to inform TypeScript about the 'user' property
        (req as any).user = decodedToken.payload as IJwtPayload;

        next();
    } catch (error: any) {
        return res.status(401).send(new IResponse(error.message, false));
    }
}
