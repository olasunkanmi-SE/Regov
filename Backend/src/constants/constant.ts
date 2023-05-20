export const HTTP_RESPONSE_CODE = {
  NOT_FOUND: 404,
  CREATED: 201,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
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
  eventCreated: "Event created successfully",
  reviewCreated: "Review created successfully",
  userAuthenticated: "User Authenticated successfully",
  userReturned: "User Returned successfully",
  usersReturned: "Users Returned successfully",
  eventsReturned: "Events Returned successfully",
  reviewsReturned: "Reviews Returned successfully",
  userDoesntExist: "User does not exist",
  eventDoesntExist: "Event does not exist",
  invalidCredentials: "Invalid user email or password",
  invalidEmail: "Enter a valid email address",
};

export const literals = {
  user: "user",
};
