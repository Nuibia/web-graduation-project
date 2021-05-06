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
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          {dataStore.roleId === UserInfoRole.管理员 && (
            <>
              <Button type="link" onClick={() => handleDel(record)}>
                删除
              </Button>
              <Button type="link" onClick={() => handleReset(record)}>
                密码重置
              </Button>
            </>
          )}
          <Button type="link" onClick={() => handleEditPwd(record)}>
            密码修改
          </Button>
        </>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPwdModalVisible, setIsPwdModalVisible] = useState(false);
  const dataStore = store;
  const handleEdit = async (record) => {
    form.setFieldsValue({
      id: record.id,
      username: record.username,
      usercount: record.usercount,
      roleid: record.roleid,
    });
    setIsModalVisible(true);
  };
  const handleEditPwd = async (record) => {
    form.setFieldsValue({
      id: record.id,
      roleid: record.roleid,
    });
    setIsPwdModalVisible(true);
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
  const handleReset = async (record) => {
    const res = await editUserInfo({
      id: record.id,
      userpwd: "aynu123456",
      roleid: record.roleid,
      guid: dataStore.guid,
    });
    const data = res?.data;
    if (data.Status === 0) {
      message.success("密码重置成功");
      form.resetFields();
      setIsModalVisible(false);
      fetchData();
    } else {
      if (data.Status === 3) {
        message.error("登陆失效，请重新登陆", 1);
        history.push(PAGES.login);
      } else {
        message.error("重置失败");
      }
    }
  };
  const [dataSource, setDataSource] = useState([]);
  const fetchData = async () => {
    const res = await findUserInfo({
      pageNum: 1,
      pageSize: 100,
      usercount: dataStore.userCount,
      roleid: dataStore.roleId,
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const onPwdFinish = async (record) => {
    const userRes = await findUserInfo({
      pageNum: 1,
      pageSize: 999,
      usercount: record.count,
    });
    const userData = userRes?.data?.Data;
    if (record.userpwd === userData[0].userpwd) {
      const res = await editUserInfo({
        id: record.id,
        userpwd: record.newuserpwd,
        roleid: record.roleid,
        guid: dataStore.guid,
      });
      const data = res?.data;
      if (data.Status === 0) {
        message.success("密码修改成功");
        form.resetFields();
        setIsPwdModalVisible(false);
        fetchData();
      } else {
        if (data.Status === 3) {
          message.error("登陆失效，请重新登陆", 1);
          history.push(PAGES.login);
        } else {
          message.error("修改失败");
        }
      }
    } else {
      message.error("旧密码有误");
    }
  };

  const handleOk = () => {
    form.submit();
  };
  const handlePwdOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const handlePwdCancel = () => {
    form.resetFields();
    setIsPwdModalVisible(false);
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
            <Input disabled />
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
            <Select disabled={(dataStore.roleId === UserInfoRole.普通)}>
              <Option value={UserInfoRole.管理员}>管理员</Option>
              <Option value={UserInfoRole.普通}>普通用户</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="密码修改"
        visible={isPwdModalVisible}
        onOk={handlePwdOk}
        onCancel={handlePwdCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} onFinish={onPwdFinish}>
          <Form.Item name="id" label="id" hidden />
          <Form.Item name="roleid" label="roleid" hidden />
          <Form.Item
            name="userpwd"
            label="旧密码"
            rules={[{ required: true, message: "请输入旧账号!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="newuserpwd"
            label="新密码"
            rules={[{ required: true, message: "请输入新昵称" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </CommonLayout>
  );
};

export default UserInfo;
