import Form from "antd/lib/form/Form";
import styled from "styled-components";

export const FormContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
`;
export const FormWrapper = styled(Form)`
  width: 300px;
  .login-form-button {
    width: 100%;
  }
`;
export const SpanWrapper = styled.span`
  padding-top: 100px;
  font-size: 40px;
  margin:0;
  margin:auto;
`;
