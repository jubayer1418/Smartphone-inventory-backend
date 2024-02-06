import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
import { User } from "../modules/user/user.model"
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            throw new Error("Unathorization access")
        }
        const decoded = jwt.verify(token, config.secret as string)
        const { role, email, username } = decoded as JwtPayload
        const user = await User.findOne({
            email, username, role
        })
        if (!user) {
            throw new Error('Unauthorized Access')
        }
        req.user = decoded as JwtPayload
        next()
    } catch (error) {
        next(error)
    }
}