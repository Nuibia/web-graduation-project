import React from 'react'
import { CommonLayout } from '../../components/CommonLayout'
import { Editor } from '../../components/editor'

const MessageAdd = () => {
    return (
        <CommonLayout>
        <Editor placeholder="请输入内容..." />
      </CommonLayout>
    )
}

export default MessageAdd
