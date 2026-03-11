import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mappers";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashedPassword: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {


    constructor(

        private readonly hashPassword: HashFunction  = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare

    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const {name, email, password} = registerUserDto;
        try {

            // 1. Verificar correo unico
            const exists = await UserModel.findOne({ email });
            if (exists) throw CustomError.badRequest("Email already exists");
            
            //2. Encriptar contraseña
            const user = await UserModel.create({
                name: name,
                email: email,
                password : this.hashPassword(password),
            });

            await user.save();

            //3. Mapear entidad


            //Todo falta un mapper
            return UserMapper.userEntityFromObject(user);


        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();

        }
        
    }  
    
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        // Implementation for login
        try {
            
            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.badRequest('Invalid credentials');

            const isMatching = this.comparePassword(password, user.password);
            if (!isMatching) throw CustomError.badRequest('Invalid credentials');

            return UserMapper.userEntityFromObject(user);

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();

        }


    }
    
}