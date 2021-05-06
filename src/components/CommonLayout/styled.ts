import { PageHeader } from "antd";
import styled from "styled-components";

export const HeaderWrapper = styled(PageHeader)`
  background: #001529;
  color:#fff;
  .ant-page-header-back-button{
    color:#fff !important;
  }
  .ant-page-header-heading-title{
    color:#fff !important;
  }
`;
export const ExtraWrapper = styled.div`
  display: flex;
  font-weight: 800;
  .exit {
    margin-left: 16px;
    cursor: pointer;
  }
  .exit:hover {
    color: #c1c2c3;
  }
`;
