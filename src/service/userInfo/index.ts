import axios from "axios";
import { BASE_URL } from "../../constant";
interface pagitation {
  pageSize: number;
  pageNum: number;
}
interface role {
  guid: string;
}
interface findUserInfoProps extends pagitation {
  roleid?: number;
  username?: number;
}
interface delUserInfoProps extends role {
  id: number;
}
interface editUserInfoProps extends role {
  username: string;
  usercount: string;
  userpwd: string;
  id: number;
  guid: string;
  roleid:number;
}
export const findUserInfo = async (params: findUserInfoProps) =>
  axios.get(`${BASE_URL}api/UserInfo/GetUserInfo`, { params });
export const delUserInfo = async (params: delUserInfoProps) =>
  axios.post(`${BASE_URL}api/UserInfo/DelUserInfo`, params);
export const editUserInfo = async (params: editUserInfoProps) =>
  axios.post(`${BASE_URL}api/UserInfo/UpdateUserInfo`, params);
