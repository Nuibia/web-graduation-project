import styled from "styled-components";
export const ContentWrapper = styled.div`
  background-image: url("../../img/VCG211320553118.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const ArticleWrapper = styled.div`
  margin: 8px 0 0 0;
  opacity: 0.9;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 780px;
  min-height: 800px;
  .title {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  .subtitle {
    display: flex;
    margin-bottom: 16px;
  }
  .author {
    margin-right:8px;
  }
  .likecount {
    margin-bottom: 24px;
  }
  .likecount .icon {
    font-size:16px;
    color:red;
    margin-right:4px;
    cursor: pointer;
  }
  .content{
      width:100%;
      height:100%;
      padding:8px;
      margin-top:4px;
    }
`;
export const CommentWrapper = styled.div`
  opacity: 0.9;
  margin-top: 8px;
  background-color: #fff;
  width: 780px;
`;
