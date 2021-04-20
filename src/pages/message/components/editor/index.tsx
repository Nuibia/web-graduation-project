import React, { FC, useState } from "react";
import { DivWrapper } from "./styled";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { Button, Input } from "antd";
interface EditorProps {
  placeholder?: string;
}
export const Editor: FC<EditorProps> = ({ placeholder }) => {
  const [editorState, setEditorState] = useState(<></>);
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
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
        excludeControls={['media']}
      />
      <div className="submit">
          <Button type="primary">提交</Button>
      </div>
    </DivWrapper>
  );
};
