import { ITodoList } from "./todo.types";

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

export interface IUserInfo {
    _id?: string;
    email: string;
    password: string;
    phone: string;
    name: string;
}

export interface IUser extends IUserInfo {todoList: ITodoList}