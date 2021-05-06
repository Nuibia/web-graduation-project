import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { CommonLayout } from "../../components/CommonLayout";
import { editmessage, findmessage } from "../../service/message";
import { ArticleWrapper, CommentWrapper, ContentWrapper } from "./styled";
import { Comment } from "./components/comment";
import { LikeFilled } from "@ant-design/icons";
import store from "../../store";
import { message } from "antd";
import PAGES from "../../router/pages";

const MessageDetail = () => {
  const { id } = useParams<{ id }>();
  const [title, setTitle] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [updateTime, setUpdateTime] = useState(undefined);
  const [likecount, setLikeCount] = useState(undefined);
  const DataStore = store;
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
  useEffect(() => {
    if (id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const history = useHistory();
  const handleAddLike = async () => {
    setLikeCount((likecount) => likecount + 1);
    const res = await editmessage({ id, guid: DataStore.guid, likecount:likecount+1 });
    if (res?.data?.Status === 0) {
      fetchData();
    } else {
      if (res?.data?.Status === 3) {
        message.error("登陆失效，请登录");
        history.push(PAGES.login);
      } else {
        message.error("操作失败，请联系管理员");
      }
    }
  };
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
          <div className="likecount">
            <LikeFilled className="icon" onClick={handleAddLike} />
            {likecount}
          </div>
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
