import Form from "antd/lib/form/Form";
import styled from "styled-components";

export const FormContainerWrapper = styled.div`
  background-image: url("../../img/VCG211320553118.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: column;
`;
export const FormWrapper = styled(Form)`
  width: 300px;
  .login-form-button {
    width: 100%;
  }
`;
export const SpanWrapper = styled.span`
  color: #ffff;
  font-size: 40px;
  margin-bottom: 100px;
`;
export const BottonWrapper = styled.div`
  display:flex;
  justify-content:space-between;
`;