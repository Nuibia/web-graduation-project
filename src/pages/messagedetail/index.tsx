import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CommonLayout } from "../../components/CommonLayout";
import { findmessage } from "../../service/message";
import { ArticleWrapper, CommentWrapper, ContentWrapper } from "./styled";
import { Comment } from "./components/comment";

const MessageDetail = () => {
  const { id } = useParams<{ id }>();
  const [title, setTitle] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [updateTime, setUpdateTime] = useState(undefined);
  const [likecount, setLikeCount] = useState(undefined);
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await findmessage({ pageSize: 999, pageNum: 1, id: id });
        const data = res?.data?.Data;
        if (data) {
          setTitle(data[0].title);
          setContent(data[0].content);
          setUpdateTime(data[0].updatetime);
          setLikeCount(data[0].likecount);
        }
      };
      fetchData();
    }
  }, [id]);
  return (
    <CommonLayout isShowHeader={false}>
      <ContentWrapper>
        <ArticleWrapper>
          <div className="title">{title}</div>
          <div className="subtitle">
            <div className="author">江鸟</div>
            <div className="updatetime">
              {dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
          <div className="likecount">点赞数：{likecount}</div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </ArticleWrapper>
        <CommentWrapper>
          <CommentWrapper />
          <Comment articleid={id} />
        </CommentWrapper>
      </ContentWrapper>
    </CommonLayout>
  );
};

export default MessageDetail;
