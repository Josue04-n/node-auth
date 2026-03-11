import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";

export class AuthMiddleware {

    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {

        //console.log('Validando JWT...');

        const authorization = req.header('Authorization');

        if (!authorization) return res.status(401).json({error: "Unauthorized"});
        if (!authorization.startsWith('Bearer '))  return res.status(401).json({error: "Unauthorized"});

            const token = authorization.split(' ').at(1) || '';
        
        try {

            const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if (!payload) return res.status(401).json({error: "Unauthorized"});
            
            const user = await UserModel.findById(payload.id);
            if (!user) return res.status(401).json({error: "Unauthorized"});


            if (!req.body) req.body = {};
            req.body.user = user;
            next();

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Internal Server Error"});
        }

    }


}