import React, { FC, useState } from "react";
import { DivWrapper } from "./styled";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { Button, Input } from "antd";
import { messageAdd, messageAddRequest } from "../../service/message";
interface EditorProps {
  placeholder?: string;
}
//复用，可以是添加，或者修改，通过params来判断
export const Editor: FC<EditorProps> = ({ placeholder }) => {
  const [editorState, setEditorState] = useState(null);
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleSubmit = async () => {
    //添加提交方法
    //需要将editorState转换为html存储到数据库中
    // console.log('editorState',editorState.toHTML())
    if (editorState) {
      const param: messageAddRequest = {
        title: "江鸟1",
        content: editorState.toHTML(),
        updatetime: new Date().toString(),
        likecount: 0,
        authorid: 6,
        guid: "1d634463-4fe2-4929-ab4c-f8f8a28903a6",
      };
      const res = await messageAdd(param);
      console.log(res);
    }
  };
  return (
    <DivWrapper>
      <div className="title">
        <span className="subtitle">标题：</span>
        <Input size="large" placeholder="请输入标题" />
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
