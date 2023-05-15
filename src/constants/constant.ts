export const HTTP_RESPONSE_CODE = {
  NOT_FOUND: 404,
  CREATED: 201,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
};

export const enum HttpStatusCode {
  NOT_FOUND = 404,
  CREATED = 201,
  CONFLICT = 409,
  BAD_REQUEST = 400,
  SUCCESS = 200,
  UNAUTHORIZED = 401,
}

export const APP_ERROR_MESSAGE = {
  serverError: "Something went wrong, try again later",
  createdUser: "User created successfully",
  userAuthenticated: "User Authenticated successfully",
  userReturned: "User Returned successfully",
  userDoesntExist: "User does not exist",
  invalidCredentials: "Invalid user email or password",
  invalidEmail: "Enter a valid email address",
};
