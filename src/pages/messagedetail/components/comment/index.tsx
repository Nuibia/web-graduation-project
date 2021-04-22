import { Avatar, Button, Form, List, Comment as AntdComment, message, CommentProps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import React, { FC, useState } from "react";
import { commentadd, commentaddProps } from "../../../../service/comment";
import { ContentWrapper } from "./styled";

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props:CommentProps) => <AntdComment {...props} />}
  />
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
const Comment: FC<CommentWrapperProps> = ({ articleid }) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit =async () => {
    if (!value) {
      message.error("内容不能为空");
      return;
    }
    setSubmitting(true);
    //执行发送评论请求,接口接入
        const param:commentaddProps = {
            content:value,
            updatetime:(new Date()).toString(),
            //TODO:文章id
            messageid:4,
            //TODO:等待接口
            authorid:1,
            guid:'',
        }
        const res =await commentadd(param);
        const data = res?.data?.Data;
        if(data){
            //执行成功
            setValue("");
            setSubmitting(false);
            let cmdList = [];
            data.forEach(element => {
                cmdList.push({author: "",  avatar:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                content:element.content,
                datetime:dayjs(element.updatetime).format("YYYY-MM-DD HH:mm:ss")
            })
            });
            setComments(cmdList);
        }else{
            //执行失败
            message.error('添加失败')
            setSubmitting(false);
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

export default Comment;
