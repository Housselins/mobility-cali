export interface AuthDataInterface {
  access_token: string;
  user: UserDataInterface;
}

export interface UserDataInterface {
  name: string;
  email: string;
  rolId?: number;
  rol?: RolInterface;
}

export interface RolInterface {
  id: number;
  name: string;
  description?: string;
}
