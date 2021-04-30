import React, { FC, useEffect, useState } from "react";
import { DivWrapper } from "./styled";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { Button, Input, message } from "antd";
import { editmessage, findmessage, messageAdd } from "../../service/message";
import { useHistory } from "react-router";
import PAGES from "../../router/pages";
import Store from "../../store";
import dayjs from "dayjs";
interface EditorProps {
  placeholder?: string;
  id?: number;
}
//复用，可以是添加，或者修改，通过params来判断
export const Editor: FC<EditorProps> = ({ placeholder, id }) => {
  const dataStore = Store;
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
        updatetime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        likecount: likecount,
        authorid: dataStore.userId,
        guid: dataStore.guid,
      };
      let res;
      if (id) {
        res = await editmessage({ id, ...param });
      } else {
        res = await messageAdd(param);
      }
      const data =res?.data;
      if (data?.Status === 0) {
        message.success("操作成功");
        history.push(PAGES.message);
      } else {
        if (data?.Status === 3) {
          message.error("登陆超时，请重新登陆",1);
          setTimeout(()=>{ 
            history.push(PAGES.login);
          },1000)          
        } else {
          message.error("操作失败");
          history.push(PAGES.message);
        }
      }
    } else {
      message.warn("内容不能为空");
    }
  };
  return (
    <DivWrapper>
      <div className="content">
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
      </div>
    </DivWrapper>
  );
};
