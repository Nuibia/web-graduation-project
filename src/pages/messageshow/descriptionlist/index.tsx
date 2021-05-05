import { HeartFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { FC, useEffect, useState } from "react";
import PAGES from "../../../router/pages";
import { findmessage } from "../../../service/message";
import { ContainerWrapper, ContentWrapper, ListWrapper } from "./styled";

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
                    <div className="author">
                      {element.userInfo.username}
                    </div>
                    <div className="time">
                      {dayjs(element.updatetime).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                  </div>
                  <div className="title">{element.title}</div>
                  <div className="content">{element.content.replace(/<[^>]+>/g, "")}</div>
                  <div className="likecount"><HeartFilled />{element.likecount}</div>
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
  return <ContainerWrapper><ContentWrapper>{content}</ContentWrapper></ContainerWrapper>;
};
