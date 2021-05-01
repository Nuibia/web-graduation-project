import styled from "styled-components";
export const ContentWrapper = styled.div`
  display: flex;
  overflow: auto;
  height: calc(100% - 64px);
  flex-direction: column;
  align-items: center;
`;
export const ContainerWrapper = styled.div`
  height: 100%;
`;
export const ListWrapper = styled.div`
  a {
    width: 100%;
    height: 100%;
  }
  a:hover {
    background-color: #f4f5f5;
  }
  display: flex;
  align-items: center;
  width: 500px;
  border-bottom: 1px solid #b2bac2;
  padding: 8px;
  .contentleft {
    width: 90%;
  }
  .first {
    display: flex;
    font-size: 1rem;
    color: #b2bac2;
  }
  .author {
    margin-right: 8px;
  }
  .title {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
  }
  .content {
    color: #b2bac2;
    font-size: 16px;
    font-weight: 500;
  }
  .likecount {
    color: #b2bac2;
  }
`;
