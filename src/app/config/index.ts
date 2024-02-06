import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });
export default {
    port: process.env.PORT,
    bcrypt: process.env.BCRYPT,
    database: process.env.DATABASE,
    secret: process.env.SECRET,
    jwtexpire:process.env.JWTEXPIRE,
    jwtexpirerefresh:process.env.JWTEXPIREREFRESH,
    refreshsecret:process.env.REFRESHSECRET,
    node:process.env.NODE_ENV
}