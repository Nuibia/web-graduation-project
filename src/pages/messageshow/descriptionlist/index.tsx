import dayjs from "dayjs";
import React, { FC, useEffect, useState } from "react";
import PAGES from "../../../router/pages";
import { findmessage } from "../../../service/message";
import { ContainerWrapper, ListWrapper } from "./styled";

export const DescriptionList: FC = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await findmessage({ pageSize: 999, pageNum: 1 });
      const data = res?.data?.Data;
      let list = [];
      if (data) {
        data.forEach((element) => {
          list.push(
            <ListWrapper>
              <a className="bg" href={`${PAGES.messagedetail}/${element.id}`}>
              <div className="contentleft">
                <div className="first">
                  <div className="author">作者：{element.userInfo.username}</div>
                  <div className="time">更新时间：{dayjs(element.updatetime).format('YYYY-MM-DD') }</div>
                </div>
                <div className="title">标题：{element.title}</div>
                <div className="content">内容：{element.content}</div>
                <div className="likecount">点赞数：{element.likecount}</div>
              </div>
              {/* <div className="img">图片</div> */}
            </a>
            </ListWrapper>
          );
        });
        setContent(list);
      }
    };
    fetchData();
  }, []);
  return <ContainerWrapper>{content}</ContainerWrapper>;
};