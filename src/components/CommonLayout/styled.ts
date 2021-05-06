import { Header } from "antd/lib/layout/layout";
import styled from "styled-components";

export const HeaderWrapper = styled(Header)`
  display: flex;
  flex-direction:row-reverse;
  .userInfo {
    color: #fff;
  }
  .exit {
    margin-left: 100px;
    cursor: pointer;
    color: #fff;
  }
  .exit:hover{
    color:#c1c2c3;
  }
`;
