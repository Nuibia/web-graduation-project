import styled from "styled-components";
export const DivWrapper = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  overflow: auto;
  display: flex;
  justify-content: center;
  .content {
    margin:16px;
    width: 804px;
    min-height:800px;
    border: 1px solid #cecece;
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #cecece;
  }
  .title .subtitle {
    font-size: 20px;
    font-weight: 400;
  }
  .title .ant-input {
    width: 300px;
    border-radius: 4px;
  }
  .submit {
    margin-top:-36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
