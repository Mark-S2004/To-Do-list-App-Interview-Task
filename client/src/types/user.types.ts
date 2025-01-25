export interface IUserLoginInfo {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  token: TokenData;
  data: IUser;
  message: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    phone: string;
    name: string;
}