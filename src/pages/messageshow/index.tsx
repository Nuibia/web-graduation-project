import React, { FC } from 'react'
import { CommonLayout } from '../../components/CommonLayout';
import { DescriptionList } from './descriptionlist';

const MessageShow:FC = () => {

    return (
       <CommonLayout>
           <DescriptionList/>
       </CommonLayout>
    )
}

export default MessageShow;
