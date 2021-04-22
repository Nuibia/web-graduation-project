import styled from "styled-components";
export const ContentWrapper = styled.div`
overflow:auto;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const ArticleWrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 100%;
  .title {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  .subtitle {
    display: flex;
    margin-bottom: 16px;
  }
  .likecount {
    margin-bottom: 24px;
  }
`;
export const CommentWrapper = styled.div`
  margin-top: 8px;
  background-color: #fff;
  width: 600px;
`;
