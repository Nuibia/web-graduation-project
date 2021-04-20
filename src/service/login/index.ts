import axios from "axios";
import { BASE_URL } from "../../constant";
interface LoginRequestProps {
  usercount: string;
  userpwd: string;
}
export const login = async (params: LoginRequestProps) =>
  axios.post(`${BASE_URL}api/Login`, { ...params });
