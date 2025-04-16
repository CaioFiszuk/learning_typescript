import axios, { AxiosRequestHeaders} from 'axios';
import { User } from '../interfaces/types';

interface ApiOptions {
  baseUrl: string;
  headers: AxiosRequestHeaders;
}

class Api {
  private baseURL: string;
  private headers: AxiosRequestHeaders;

  constructor(options: ApiOptions) {
    this.baseURL = options.baseUrl;
    this.headers = options.headers;
  }

    getUsers() {
        return axios.get(`${this.baseURL}/users`, { headers: this.headers })
        .then((res) => {
            return res.data;
          })
          .catch((error) => {
            return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
          });
    }

}

const api = new Api({
    baseUrl: "https://jsonplaceholder.typicode.com",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };