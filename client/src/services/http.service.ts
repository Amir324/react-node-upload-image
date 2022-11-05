import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface HttpServiceConfig {
  baseURL?: string;
}

export default class HttpService {
  private axiosInstance: AxiosInstance;

  constructor({ baseURL }: HttpServiceConfig) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get(url, config);

    return response.data as T;
  }

  async post<T, R>(url: string, data?: T, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.post(url, data, config);

    return response.data as R;
  }

  async put<T, R>(url: string, data: T) {
    const response = await this.axiosInstance.put(url, data);

    return response.data as R;
  }

  async delete<R>(url: string) {
    const response = await this.axiosInstance.delete(url);

    return response.data as R;
  }
}
