import React, { FC } from "react";
import { ExtraWrapper, HeaderWrapper } from "./styled";
import store from "../../store";
import { useHistory } from "react-router";
import PAGES from "../../router/pages";
import { Button } from "antd";

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
    localStorage.removeItem('UserInfo')
    DataStore.clearData();
    history.push(PAGES.login);
  };
  return (
    <>
      {isShowHeader && (
        <HeaderWrapper
          ghost={false}
          onBack={() => history.goBack()}
          title="返回上一步"
          extra={[
            <ExtraWrapper>
              {DataStore.guid ? (
                <>
                  <div className="desc">欢迎您：{DataStore.userName}</div>
                  <div className="exit" onClick={handleExit}>
                    退出登录
                  </div>
                </>
              ) : (
                <>
                  <div className="desc">体验更多功能请先登陆</div>
                  <Button
                    type="primary"
                    onClick={() => history.push(PAGES.login)}
                  >
                    登录
                  </Button>
                </>
              )}
            </ExtraWrapper>,
          ]}
        ></HeaderWrapper>
      )}
      {children}
    </>
  );
};
