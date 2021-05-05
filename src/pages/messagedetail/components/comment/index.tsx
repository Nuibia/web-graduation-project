import {
  Avatar,
  Button,
  Form,
  List,
  Comment as AntdComment,
  message,
  CommentProps,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import PAGES from "../../../../router/pages";
import {
  commentadd,
  commentaddProps,
  findcomment,
} from "../../../../service/comment";
import store from "../../../../store";
import { ContentWrapper, ListWrapper } from "./styled";

const CommentList = ({ comments }) => (
  <ListWrapper>
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(props: CommentProps) => <AntdComment {...props} />}
    />
  </ListWrapper>
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        添加评论
      </Button>
    </Form.Item>
  </>
);
interface CommentWrapperProps {
  articleid?: number;
}
export const Comment: FC<CommentWrapperProps> = ({ articleid }) => {
  const DataStore = store;
  const fetchData = async () => {
    const res = await findcomment({
      pageNum: 1,
      pageSize: 999,
      messageid: articleid,
    });
    const data = res?.data;
    if (data) {
      let cmdList = [];
      (data?.Data || []).forEach((element) => {
        cmdList.push({
          author: DataStore.userName,
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content: element.content,
          datetime: dayjs(element.updatetime).format("YYYY-MM-DD HH:mm:ss"),
        });
      });
      setComments(cmdList);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dataStore = store;
  const history = useHistory();
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = async () => {
    if (!value) {
      message.error("内容不能为空");
      return;
    }
    setSubmitting(true);
    //执行发送评论请求,接口接入
    const param: commentaddProps = {
      content: value,
      updatetime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      messageid: articleid,
      authorid: dataStore.userId,
      guid: dataStore.guid,
    };
    const res = await commentadd(param);
    const data = res?.data;
    if (data.Status === 0) {
      message.success("添加成功");
      setValue("");
      setSubmitting(false);
      fetchData();
    } else {
      //执行失败
      if (data.Status === 3) {
        message.error("登陆状态过期，请重新登陆");
        setSubmitting(false);
        history.push(PAGES.login);
      } else {
        message.error("添加失败");
        setSubmitting(false);
      }
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <ContentWrapper>
      <AntdComment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
      {comments.length > 0 && <CommentList comments={comments} />}
    </ContentWrapper>
  );
};
