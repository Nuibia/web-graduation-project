import React, { FC } from "react";
import { ExtraWrapper, HeaderWrapper } from "./styled";
import store from "../../store";
import { useHistory } from "react-router";
import PAGES from "../../router/pages";

interface CommonLayoutProps {
  isShowHeader?: boolean;
}

//公共布局组件
export const CommonLayout: FC<CommonLayoutProps> = ({
  isShowHeader = true,
  children,
}) => {
  const DataStore = store;
  const history = useHistory();
  const handleExit = () => {
    history.push(PAGES.login);
  };
  return (
    <>
      {isShowHeader && (
        <HeaderWrapper
          ghost={false}
          onBack={() => window.history.back()}
          title="返回上一步"
          extra={[
            <ExtraWrapper>
              <div className="userInfo">欢迎您：{DataStore.userName}</div>
              <div className="exit" onClick={handleExit}>
                退出登录
              </div>
            </ExtraWrapper>,
          ]}
        ></HeaderWrapper>
      )}
      {children}
    </>
  );
};
