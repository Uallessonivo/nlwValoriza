import { getCustomRepository } from "typeorm"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UserRepositories } from "../repositories/UserRepositories"


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {


    async execute({ email, password }: IAuthenticateRequest) {

        const userRepositories = getCustomRepository(UserRepositories)

        const user = await userRepositories.findOne({ email })

        if (!user) {
            throw new Error("Email or Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email or Password incorrect")
        }

        const token = sign({
            email: user.email,
        }, "65a923a512218e0a407f949815da7541", { subject: user.id, expiresIn: "1d" })

        return token
    }
}

export { AuthenticateUserService }