import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { CommonLayout } from "../../components/CommonLayout";
import PAGES from "../../router/pages";
import {
  delUserInfo,
  editUserInfo,
  findUserInfo,
} from "../../service/userInfo";
import store from "../../store";
import { UserInfoRole } from "../../types/userInfo";
const { Option } = Select;
const UserInfo = () => {
  const columns = [
    {
      title: "账号",
      dataIndex: "usercount",
      key: "usercount",
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "权限",
      dataIndex: "roleid",
      key: "roleid",
      render: (text, record) => (
        <>
          {text === 0 && <span>管理员</span>}
          {text === 1 && <span>用户</span>}
        </>
      ),
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>编辑</Button>
          <Button onClick={() => handleDel(record)}>删除</Button>
        </>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dataStore = store;
  const handleEdit = async (record) => {
    form.setFieldsValue({
      id: record.id,
      username: record.username,
      userpwd: record.userpwd,
      usercount: record.usercount,
      roleid: record.roleid,
    });
    setIsModalVisible(true);
  };
  const history = useHistory();
  const handleDel = async (record) => {
    const res = await delUserInfo({ id: record.id, guid: dataStore.guid });
    const data = res?.data;
    if (data.Status === 0) {
      message.success("删除成功");
      fetchData();
    } else {
      if (data.Status === 3) {
        message.error("当前登陆状态已过期，请重新登陆");
        history.push(PAGES.login);
      } else {
        message.error("删除失败");
      }
    }
  };
  const [dataSource, setDataSource] = useState([]);
  const fetchData = async () => {
    const res = await findUserInfo({ pageNum: 1, pageSize: 100 });
    const data = res?.data?.Data;
    if (data) {
      let list = [];
      data.forEach((element) => {
        list.push({
          id: element.id,
          usercount: element.usercount,
          username: element.username,
          userpwd: element.pwd,
          roleid: element.roleid,
        });
      });
      setDataSource(list);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    const res = await editUserInfo({
      id: value.id,
      username: value.username,
      usercount: value.usercount,
      roleid: value.roleid,
      guid: dataStore.guid,
    });
    const data = res?.data;
    if (data.Status === 0) {
      message.success("修改成功");
      form.resetFields();
      setIsModalVisible(false);
      fetchData();
    } else {
      if (data.Status === 3) {
        message.error("登陆失效，请重新登陆", 1);
        history.push(PAGES.login);
      } else {
        message.error("修改失败");
      }
    }
  };
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  return (
    <CommonLayout>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="编辑用户"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="id" label="id" hidden />
          <Form.Item
            name="usercount"
            label="账号"
            rules={[{ required: true, message: "请输入账号!" }]}
          >
            <Input  disabled/>
          </Form.Item>
          <Form.Item
            name="username"
            label="昵称"
            rules={[{ required: true, message: "请输入昵称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="roleid"
            label="权限"
            rules={[{ required: true, message: "请选择权限" }]}
          >
            <Select>
              <Option value={UserInfoRole.管理员}>管理员</Option>
              <Option value={UserInfoRole.普通}>普通用户</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </CommonLayout>
  );
};

export default UserInfo;
