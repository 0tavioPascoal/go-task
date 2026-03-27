import type { IUser } from "../user/user-inteface";

export interface ILoginResponse {
  user: IUser;
  accessToken?: string; 
  refreshToken?: string;
}