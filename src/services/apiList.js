export const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
export const AGENT_API= import.meta.env.VITE_REACT_APP_AGENT_API;

export const endpoints = {
  SEND_OTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSWORD_TOKEN_API: BASE_URL + "/auth/updatePasswordToken",
  RESETPASSWORD_API: BASE_URL + "/auth/updatePassword",

  ADD_ACCOMMODATION_API: BASE_URL + "/accommodation/addAccommodation",
  LIKE_ACCOMMODATION_API: BASE_URL + "/accommodation/likeAccommodation",
  UNLIKE_ACCOMMODATION_API: BASE_URL + "/accommodation/unlikeAccommodation",
  GET_ALL_ACCOMMODATION_API: BASE_URL + "/accommodation/getAllAccommodation",
  GET_LIKED_ACCOMMODATIONID_API: BASE_URL + "/accommodation/getAllLikedAccommodationId",
  GET_LIKED_ACCOMMODATION_API: BASE_URL + "/accommodation/getAllLikedAccommodation",
  GET_USER_ACCOMMODATION_API: BASE_URL + "/accommodation/getAllAddedByUser",
  UPDATE_ACCOMMODATION_API: BASE_URL + "/accommodation/updateAccommodation",
  DELETE_ACCOMMODATION_API: BASE_URL + "/accommodation/deleteAccommodation",
  AI_API: AGENT_API,
};
