import axios from "axios";
import { BASE_URL } from "../../constant";
axios.interceptors.request.use(config => {
  config.withCredentials = true;
  return config;
});
export interface messageAddRequest {
  title: string;
  content: string;
  updatetime: string;
  likecount: number;
  authorid: number;
  guid: string;
}
export interface editMessageRequest extends messageAddRequest{
  id:number;
}
interface findmessageRequest {
  pageSize: number;
  pageNum: number;
  authorid?: number;
  id?: number;
}
interface delmessageRequest {
  id: number;
  guid: string;
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
  axios.get(`${BASE_URL}api/MessageInfo/GetMessageInfo`, {
    params,
  });
/**
 * 信息修改
 */
export const editmessage = async (params: editMessageRequest) => 
  axios.post(`${BASE_URL}api/MessageInfo/UpdateMessageInfo`, params);
;

/**
 * 信息删除
 */
export const delmessage = async (params: delmessageRequest) =>
  axios.post(`${BASE_URL}api/MessageInfo/DelMessageInfo`, params);
