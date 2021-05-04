import styled from "styled-components";

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 8px;
  .chart {
    height: calc(100% - 70px);
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .chart .top {
    width: calc(100% - 8px);
    height: 100%;
    display: flex;
  }
  .chart .bottom {
    width: calc(100% - 8px);
    height: 100%;
    display: flex;
  }
  .chart .ant-empty {
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;
export const PartContentWrapper = styled.div`
  width: 50%;
  background-color: #fff;
  margin: 8px 4px ;
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
