import React, { FC, useEffect, useState } from "react";
import { DivWrapper } from "./styled";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { Button, Input, message } from "antd";
import { findmessage, messageAdd } from "../../service/message";
import { useHistory } from "react-router";
import PAGES from "../../router/pages";
interface EditorProps {
  placeholder?: string;
  id?: number;
}
//复用，可以是添加，或者修改，通过params来判断
export const Editor: FC<EditorProps> = ({ placeholder, id }) => {
  const [editorState, setEditorState] = useState(null);
  const [inputValue, setInputValue] = useState();
  const [likecount, setLikecount] = useState(0);
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await findmessage({ pageNum: 1, pageSize: 999, id: id });
        const content = BraftEditor.createEditorState(res.data.Data[0].content);
        setLikecount(res.data.Data[0].likecount);
        setEditorState(content);
        setInputValue(res.data.Data[0].title);
      };
      fetchData();
    }
  }, [id]);
  const InputHandleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };
  const history = useHistory();
  const handleSubmit = async () => {
    //添加提交方法
    //需要将editorState转换为html存储到数据库中
    // console.log('editorState',editorState.toHTML())
    if (editorState) {
      const param = {
        title: inputValue,
        content: editorState.toHTML(),
        updatetime: new Date().toString(),
        likecount: likecount,
        //TODO:等待登陆功能
        authorid: 6,
        //TODO:等待登陆功能
        guid: "1d634463-4fe2-4929-ab4c-f8f8a28903a6",
      };
      const res = await messageAdd(param);
      console.log(res.data.Data);
      if(res.data.Data){
        message.success('操作成功');
        history.push(PAGES.message);
      }else{
        message.error('操作失败');
        history.push(PAGES.message);
      }
    }else{
      message.warn('内容不能为空');
    }
  };
  return (
    <DivWrapper>
      <div className="title">
        <span className="subtitle">标题：</span>
        <Input
          size="large"
          placeholder="请输入标题"
          value={inputValue}
          onChange={InputHandleChange}
        />
      </div>
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        placeholder={placeholder}
        excludeControls={["media"]}
      />
      <div className="submit">
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </div>
    </DivWrapper>
  );
};
