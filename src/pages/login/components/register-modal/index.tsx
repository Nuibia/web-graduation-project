import { Form, Input, message, Modal } from 'antd'
import React, { FC } from 'react'
import { addUserInfo } from '../../../../service/userInfo';

interface RegisterModalProps {
    isModalVisible:boolean;
    modalhandleCancel:(status: boolean)=>void;
}
export const RegisterModal:FC<RegisterModalProps> = ({isModalVisible, modalhandleCancel}) => {
    const [form] = Form.useForm();

    const onRegistFinish = async(value) =>{
        //注册逻辑
        const res = await  addUserInfo({...value,roleid:1});
        const data = res?.data;
        if(data?.Status === 0){
          message.success('注册成功');
          form.resetFields();
          modalhandleCancel(false);
        }else{
          message.error('注册失败');
        }
    }
    const handleOk = () => {
        form.submit();
      };
    
      const handleCancel = () => {
        form.resetFields();
        modalhandleCancel(false);
      };      
    return (
        <Modal
        title="用户注册"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} onFinish={onRegistFinish}>
          <Form.Item
            name="usercount"
            label="账号"
            rules={[{ required: true, message: "请输入账号!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="userpwd"
            label="密码"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="昵称"
            rules={[{ required: true, message: "请输入昵称" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    )
}
