import styled from "styled-components";

export const DivWrapper = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  overflow:auto;
  .title {
    display:flex;
    justify-content:center;
    align-items:center;
    padding:16px 0;
    border-bottom:1px solid #cecece;
  }
  .title .subtitle {
    font-size:20px;
    font-weight:400;
  }
  .title .ant-input {
    width:300px;
    border-radius:4px;
  }
  .submit{
    border-top:1px solid #cecece;
    padding:16px 0;
    display:flex;
    justify-content:center;
    align-items:center;
  }
`;
