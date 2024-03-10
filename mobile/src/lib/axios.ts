import Axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import _ from "lodash";

// function authRequestInterceptor(config: AxiosRequestConfig) {
//     const token = storage.getToken();
//     if (token) {
//         config.headers.authorization = `${token}`;
//     }
//     config.headers.Accept = 'application/json';
//     return config;
// }

export const axios = Axios.create({
  baseURL: "/",
  // headers: { Accept: 'application/json' },
});

let CANCEL_TOKEN_SOURCE = Axios.CancelToken.source();

function generateNewCancelTokenSource() {
  CANCEL_TOKEN_SOURCE = Axios.CancelToken.source();
}

export const finishPendingRequests = (cancellationReason: string) => {
  CANCEL_TOKEN_SOURCE.cancel(cancellationReason);
  generateNewCancelTokenSource();
};

// axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response: any) => {
    // console.log('error Axios instance');
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error: any) => {
    console.log(
      "errorRequest",
      error,
      error?.response,
      error?.response?.status
    );
  }
);

export type ApiResponse<T = any> = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  result?: T;
  totalCount?: number;
  error?: Record<string, string[]>;
};

export type PaginatedList<T = any> = {
  totalCount: number;
  offset: number;
  limit: number;
  totalPages: number;
  currentPage: number;
  items: T[];
};

export type ResultResponse<T = any> = Promise<AxiosResponse<ApiResponse<T>>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 * @param config
 */
export const requestApi = <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): ResultResponse<T> => {
  switch (method) {
    case "get":
    case "GET":
      return Axios.get(url, {
        params: data,
        ...config,
      }).catch((error) => {
        console.log(
          "errorRequest",
          error,
          error?.response,
          error?.response?.status
        );
        return Promise.resolve({
          ...error.response,
          data: {
            success: false,
            message: "",
            errors: error.response?.data?.errors,
          },
        });
      });
    case "post":
    case "POST":
      return Axios.post(url, data, config).catch((error) => {
        console.log(
          "errorRequest",
          error,
          error.response,
          error.response?.status
        );
        return Promise.resolve({
          ...error.response,
          data: {
            success: false,
            message: "",
            errors: error.response?.data?.errors || error.response?.data?.error,
          },
        });
      });
    case "delete":
    case "DELETE":
      return Axios.delete(url, {
        params: data,
        ...config,
      }).catch((error) => {
        console.log(
          "errorRequest",
          error,
          error.response,
          error.response?.status
        );
        return Promise.resolve({
          ...error.response,
          data: {
            success: false,
            message: "",
            errors: error.response?.data?.errors,
          },
        });
      });
    case "put":
    case "PUT":
      return Axios.put(url, data, config).catch((error) => {
        console.log(
          "errorRequest",
          error,
          error.response,
          error.response?.status
        );
        return Promise.resolve({
          ...error.response,
          data: {
            success: false,
            message: "",
            errors: error.response?.data?.errors,
          },
        });
      });
    default:
      return Axios.get(url, {
        params: data,
        ...config,
      }).catch((error) => {
        console.log(
          "errorRequest",
          error,
          error.response,
          error.response?.status
        );
        return Promise.resolve({
          ...error.response,
          data: {
            success: false,
            message: "",
            errors: error.response?.data?.errors,
          },
        });
      });
  }
};

export const queryStringSerialize = (obj: any = {}): string => {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p) && obj[p] != null) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
