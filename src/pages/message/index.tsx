import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { CommonLayout } from "../../components/CommonLayout";
import { findmessage } from "../../service/message";
import { TableWrapper } from "./style";

const Message = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchData = async ()=>{
      const res = await findmessage({pageSize:10,pageNum:1});
      console.log(res);
      if(res){
        setDataSource(res.data.Data);
      }
    }
    fetchData();
  }, [])
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "更新时间",
      dataIndex: "updatetime",
      key: "updatetime",
    },
    {
      title: "点赞次数",
      dataIndex: "likecount",
      key: "likecount",
    },
    {
      title: "操作",
      key: "",
    },
  ];
  return (
    <CommonLayout>
      <TableWrapper>
        <Table columns={columns} dataSource={dataSource}/>
      </TableWrapper>
    </CommonLayout>
  );
};

export default Message;
