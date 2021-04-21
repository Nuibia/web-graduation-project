import React from 'react'
import { useParams } from 'react-router-dom';
import { CommonLayout } from '../../components/CommonLayout';
import { Editor } from '../../components/editor';

const MessageEdit = () => {
    const {id} = useParams<{id}>();
    return (
        <CommonLayout>
        <Editor placeholder="请输入内容..." id={id}/>
      </CommonLayout>
    )
}

export default MessageEdit;
