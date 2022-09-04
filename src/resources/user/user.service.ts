import userModel from "./user.model";
import token from "@/utils/token";

class UserService {
    private user = userModel


    public async register(
        name: string,
        email: string,
        password: string,
        role: string,
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({ name, email, password, role })
            const accesstoken = token.createToken(user)
            return accesstoken
        } catch (error) {
            throw new Error('Unable to register user')
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email })
            if (!user) {
                throw new Error("User not found");
            }
            if (await user.isValidPassword(password)) {
                return token.createToken(user)
            } else {
                throw new Error("Invalid credentials")
            }
        } catch (error) {
            throw new Error("User not found");
        }
    }
}
export default UserService