export interface ICreateUser {
  email: string;
  password: string;
  userName: string;
}

interface IUser {
  _id: string;
  email: string;
  role?: string;
  userName: string;
  accessToken?: string;
}

interface IApiResponse {
  success: boolean;
  code: number;
  message: string;
}

export interface IUsersResponse extends IApiResponse {
  data: IUser[];
  request: {
    type: string;
    url: string;
  };
}

export interface IUserResponse extends IApiResponse {
  data: IUser;
  request: {
    type: string;
    url: string;
  };
}
