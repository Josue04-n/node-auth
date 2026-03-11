import { Router } from "express";
import { AuthControllers } from "./controllers";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {

    static get routes(): Router {  

        const routes = Router();
        
        const datasource = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        
        const controller = new AuthControllers(authRepository);

        //Definir rutas aquí
        routes.post('/login', controller.loginUser);
        routes.post('/register', controller.registerUser);
        routes.get('/', AuthMiddleware.validateJWT, controller.getUser);

        return routes;

     }
}   