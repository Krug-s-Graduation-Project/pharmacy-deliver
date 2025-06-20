import { User } from "./user.interface";

export interface CredentialLoginResponse {
  accessToken: string;
  user: User;
}