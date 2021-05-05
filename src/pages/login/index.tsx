import { Button, Form, Input, message } from "antd";
import React, { FC } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../service/login";
import { BottonWrapper, FormContainerWrapper, FormWrapper, SpanWrapper } from "./style";
import { CommonLayout } from "../../components/CommonLayout";
import Store from "../../store";
import PAGES from "../../router/pages";
import { useHistory } from "react-router";

const Login: FC = () => {
  const dataStore = Store;
  const history = useHistory();
  const onFinish = async (value: any) => {
    const res = await login(value);
    const data = res?.data;
    if (data?.Status === 0) {
      dataStore.setUserInfo({ guid: data.guid, userCount: value.usercount });
      history.push(PAGES.bigScreen);
    } else {
      message.error("登陆失败");
    }
  };
  return (
    <CommonLayout isShowHeader={false}>
      <FormContainerWrapper>
        <SpanWrapper>疫情数据后台管理系统登陆</SpanWrapper>
        <FormWrapper name="normal_login" onFinish={onFinish}>
          <Form.Item
            name="usercount"
            rules={[{ required: true, message: "账号不能为空!" }]}
          >
            <Input
              placeholder="请输入账号"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            name="userpwd"
            rules={[{ required: true, message: "密码不能为空!" }]}
          >
            <Input
              type="password"
              placeholder="请输入密码"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item>
            <BottonWrapper>
              <Button type="primary" htmlType="submit">
                登陆
              </Button>
              <Button type="primary" danger>
                注册
              </Button>
            </BottonWrapper>
          </Form.Item>
        </FormWrapper>
      </FormContainerWrapper>
    </CommonLayout>
  );
};

export default Login;
