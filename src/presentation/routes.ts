import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {

    static get routes(): Router {  

        const routes = Router();

        //Definir tus rutas aquí
        routes.use('/api/auth', AuthRoutes.routes)
        
        return routes;

     }
}   