import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { CommonLayout } from "../../components/CommonLayout";
import {
  delUserInfo,
  editUserInfo,
  findUserInfo,
} from "../../service/userInfo";
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
      title: "密码",
      dataIndex: "userpwd",
      key: "userpwd",
    },
    {
      title: "权限",
      dataIndex: "roleid",
      key: "roleid",
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
  const handleEdit = async (record) => {
    form.setFieldsValue({
      username: record.username,
      userpwd: record.pwd,
      usercount: record.usercount,
      roleid: record.roleid,
    });
    // setDefaultValueKey(record.roleid);
    setIsModalVisible(true);
  };
  const handleDel = async (record) => {
    const res = await delUserInfo({ id: record.id, guid: "" });
    const data = res?.data.Data;
    if (data) {
      message.success("删除成功");
    } else {
      message.error("删除失败");
    }
  };
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
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
    fetchData();
  }, []);
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    const res = await editUserInfo({
      id: 0,
      username: value.username,
      userpwd: value.userpwd,
      usercount: value.usercount,
      roleid: value.roleid,
      guid: "",
    });
    const data = res?.data?.Data;
    if (data) {
      message.success("编辑成功");
      form.resetFields();
      setIsModalVisible(false);
    } else {
      message.error("编辑失败");
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
          <Form.Item name="usercount" label="账号" rules={[{ required: true,  message: '请输入账号!'  }]}>
            <Input />
          </Form.Item>
          <Form.Item name="username" label="昵称" rules={[{ required: true,  message: '请输入昵称'  }]}>
            <Input />
          </Form.Item>
          <Form.Item name="userpwd" label="密码" rules={[{ required: true,  message: '请输入密码'  }]}>
            <Input />
          </Form.Item>
          <Form.Item name="roleid" label="权限" rules={[{ required: true,  message: '请选择权限'  }]}>
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
