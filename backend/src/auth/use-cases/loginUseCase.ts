import prisma from "../../lib/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
type Input = {
    email: string;
    password: string;
}
type Output = {
    user: any;
    token: string;
}
export class LoginUseCase {

    async execute(input: Input, password: any): Promise<Output> {
        // Find user by email
        const user = await prisma.userLoginDetail.findFirst({where: {email: input.email}});
        if (!user) {
        throw new Error('User not found');
        }

        // const isMatch = await bcrypt.compare(input.password, user.password);
        // if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return {   user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                userStatus: user.userStatus,
            }, token };
    }
}