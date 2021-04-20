import { Button, Form, Input } from "antd";
import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../service/login";
const onFinish = async (value: any) => {
    const res = await login(value);
    console.log(res);
};
const Login = () => {
  return (
    <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
