import axios from "axios";
import { BASE_URL } from "../../constant";
export interface messageAddRequest {
  title: string;
  content: string;
  updatetime: string;
  likecount: number;
  authorid: number;
  guid: string;
}
interface findmessageRequest {
  pageSize: number;
  pageNum: number;
  authorid?: number;
  id?: number;
}
interface messageResponse {
  Data: any;
}
/**
 * 信息添加
 * @param params
 */
export const messageAdd = async (params: messageAddRequest) =>
  axios.post(`${BASE_URL}api/MessageInfo/AddMessageInfo`, { ...params });
/**
 *
 * @param params 信息查看
 */
export const findmessage = async (params: findmessageRequest) =>
  axios.get<messageResponse>(`${BASE_URL}api/MessageInfo/GetMessageInfo`, {
    params,
  });
