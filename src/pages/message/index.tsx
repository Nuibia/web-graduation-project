import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { CommonLayout } from "../../components/CommonLayout";
import { delmessage, findmessage } from "../../service/message";
import { ButtonWrapper, TableWrapper } from "./style";
import dayjs from "dayjs";
import PAGES from "../../router/pages";
import { useHistory } from "react-router";

const Message = () => {
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await findmessage({ pageSize: 10, pageNum: 1 });
      console.log(res);
      if (res) {
        setDataSource(res.data.Data);
      }
    };
    fetchData();
  }, []);
  const handleEdit = (record) => {
    history.push(`${PAGES.messageedit}/${record.id}`);
  };
  const handleDel =async (record) => {
    const res =await delmessage({id:record.id,guid:''});
    if(res?.data?.Data){
      message.success('删除成功');
    }else{
      message.error('操作失败,请联系管理员');
    }
  };
  const handleAdd = () => {
    history.push(PAGES.messageadd);
  };
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "更新时间",
      dataIndex: "updatetime",
      sorter: (a, b) => a.updatetime - b.updatetime,
      render: (text) => (
        <span>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</span>
      ),
    },
    {
      title: "点赞次数",
      dataIndex: "likecount",
      sorter: (a, b) => a.likecount - b.likecount,
    },
    {
      title: "作者",
      dataIndex: ["userInfo", "username"],
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (text, record) => (
        <>
          <Button
            style={{ marginRight: "8px" }}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button onClick={() => handleDel(record)}>删除</Button>
        </>
      ),
    },
  ];
  return (
    <CommonLayout>
      <ButtonWrapper>
        <Button type="primary" onClick={handleAdd}>
          新增信息
        </Button>
      </ButtonWrapper>
      <TableWrapper>
        <Table columns={columns} dataSource={dataSource} showSorterTooltip={false}/>
      </TableWrapper>
    </CommonLayout>
  );
};

export default Message;
