import { Model } from "mongoose";

export type TLogin = {
  email: string;
  password: string;
  role?: string;
};
export type TRegister = {
  name: string;
  email: string;
  password: string;
role?: string;
};
export interface userModel extends Model<TRegister> {
  //checking user exist
  isUserExistsByEmail(email: string): Promise<TRegister>;
  //checking user password matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
