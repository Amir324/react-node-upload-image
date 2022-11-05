import BaseService from "./base.service";
import HttpService from "./http.service";
import { AxiosRequestConfig } from "axios";

export default class CrudService extends BaseService {
  async create<D, R>(data: D, config?: AxiosRequestConfig) {
    const response = await this.httpService.post<D, R>(
      `${this.path}`,
      data,
      config
    );
    return response;
  }

  async get<R>(id: string, config?: AxiosRequestConfig) {
    const response = await this.httpService.get<R>(`${this.path}${id}`, config);

    return response;
  }
}

export const imageService = new CrudService({
  route: "/v1/file",
  httpService: new HttpService({ baseURL: process.env.REACT_APP_SERVER }),
});
