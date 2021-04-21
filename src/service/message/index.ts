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
export const messageAdd = (params: messageAddRequest) => {
  axios.post(`${BASE_URL}api/MessageInfo/AddMessageInfo`, { ...params });
};
