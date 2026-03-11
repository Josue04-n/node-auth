import { Validators } from "../../../config";

export class LoginUserDto{

    constructor (
    public email: string,
    public password: string,
    ){}

    static create(object: {[key:string]:any }) : [string?, LoginUserDto?]{
    
            const {email, password} = object;
    
            if (!email) return ['Email is required'];
            if (!Validators.email.test(email)) return ['Invalid email format'];
            if (!password) return ['Password is required'];
            if (password.length < 6) return ['Password must be at least 6 characters long'];
    
            return [
                null as any,
                new LoginUserDto(email, password)
            ];
    
    }
    

   
}