import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";



interface IAuthenticateClient{
    username: string;
    password: string;
}

interface IResponse {
    client: {
        username: string,
    },

    token: string;
}

export class AuthenticateClientUseCase {
    async execute({username, password}: IAuthenticateClient): Promise<IResponse> {

        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        });

        if(!client) {
            throw new Error ("Username or password invalid!");
        };

        const passwordMatch = await compare(password, client.password);

        if(!passwordMatch) {
            throw new Error ("Username or password invalid!");
        };

        const token = sign({username}, "1ea74cfadacdec4db8badd65b18fd42a", {
            subject: client.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token, 
            client: {
                username: client.username,                
            }
        }

        return tokenReturn;
    }
}

// Receber as informações do usuário (username e password)
// Verificar se o usuário está cadastrado
// Verificar se a senha corresponde ao usuário
// Gerar o token