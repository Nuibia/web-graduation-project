import axios from "axios";
import { BASE_URL } from "../../constant";
axios.interceptors.request.use(config => {
  config.withCredentials = true;
  return config;
});

export interface commentaddProps {
  content: string;
  updatetime: string;
  messageid: number;
  authorid: number;
  guid: string;
}
/**
 * 评论添加
 */
export const commentadd = async (params: commentaddProps) =>
  axios.post(`${BASE_URL}api/CommentInfo/AddCommentInfo`, params);

/**
 * 评论删除
 */
export const commentdel = async (params: { id: number; guid: string }) =>
  axios.post(`${BASE_URL}api/CommentInfo/DelCommentInfo`, params);
/**
 * 评论查看
 */
export const findcomment = async (params: {
  pageSize: number;
  pageNum: number;
  messageid: number;
}) => axios.get(`${BASE_URL}api/CommentInfo/GetCommentInfo`, { params });
