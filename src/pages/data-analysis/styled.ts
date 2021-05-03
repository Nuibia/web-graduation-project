import styled from "styled-components";

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 8px;
  .chart {
    height: calc(100% - 70px);
    width: 100%;
    overflow: auto;
  }
`;
export const PartContentWrapper = styled.div`
  background-color: #fff;
  margin: 8px 0;
  .title {
    font-size: 40px;
    font-weight: 800;
    display: flex;
    justify-content: center;
  }
`;
export const FilterWRapper = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #fff;
  display: flex;
  .ant-input-affix-wrapper {
    width: 200px;
  }
  .ant-picker {
    margin-left: 16px;
  }
`;
