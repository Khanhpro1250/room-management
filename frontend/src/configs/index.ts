// export const APP_API_PATH = `${window.location.host}`
export const APP_API_PATH = process.env.REACT_APP_API_URL as string;

export const API_CHECK_LOGIN = APP_API_PATH + '/identity/check-login';
export const API_LOGIN = APP_API_PATH + '/identity/login';
export const API_LOGOUT = APP_API_PATH + '/identity/logout';
//layout

export const API_LAYOUT = APP_API_PATH + '/menu/layout';

// Register api
export const REGISTER_API = APP_API_PATH + '/identity/register';
export const CHECK_REGISTER_API = APP_API_PATH + '/identity/check-register';
export const RESENT_OTP_REGISTER_API = APP_API_PATH + '/identity/resent-otp-register';

export const UPLOAD_FILE_API = APP_API_PATH + '/file/upload';
export const UPLOAD_MULTI_FILE_API = APP_API_PATH + '/file/upload-multi';

export const FORGOT_API = APP_API_PATH + '/identity/forgot-password';
export const RESENT_FORGOT_API = APP_API_PATH + '/identity/resent-forgot-password';
export const CHANGE_PASSWORD_API = APP_API_PATH + '/identity/change-password';
