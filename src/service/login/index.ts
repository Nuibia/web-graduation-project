import axios from "axios";
import { BASE_URL } from "../../constant";
axios.interceptors.request.use(config => {
  config.withCredentials = true;
  return config;
});
interface LoginRequestProps {
  usercount: string;
  userpwd: string;
}

export const login = async (params: LoginRequestProps) =>
  axios.post(`${BASE_URL}api/Login`, { ...params });
