import { Request, Response } from "express";
import { AuthRepository, CustomError, LoginUser, RegisterUser, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthControllers {

    constructor(
        private readonly autRepository: AuthRepository,

    ) {}

    private handleError ( error: unknown, res: Response) {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});

        }

        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});

    }

    registerUser =  (req: Request, res: Response) =>{
       
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({error});
        
        new RegisterUser(this.autRepository)
         .excute(registerUserDto as RegisterUserDto)
         .then(data => res.json(data))
         .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) =>{
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({error});
        
        new LoginUser(this.autRepository)
         .excute(loginUserDto as LoginUserDto)
         .then(data => res.json(data))
         .catch(error => this.handleError(error, res));

    }

    getUser = (req: Request, res: Response) => {
        UserModel.find()
         .then(users => {
            res.json({
                user: req.body.user
            })
        })
         .catch(()=>res.status(500).json({error: "Internal Server Error"}));
    }
}

