import React, { FC, useEffect, useState } from "react";
import "antd/dist/antd.css";
import Routers from "./router";
import Sider from "antd/lib/layout/Sider";
import styled from "styled-components";
import { SliderMenu } from "./components/SiderMenu";
import PAGES from "./router/pages";
import { LayoutContainer } from "./components/antd-override";
export const SiderContainer = styled(Sider)`
  overflow: auto;
  height: 100%;
  position: fixed;
  width: 200px;
  left: 0;
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
  }
`;
const App: FC = () => {
  const pathname = window.location.pathname;
  const [isShowSider, setIsShowSider] = useState(true);
  useEffect(() => {
    if (pathname === PAGES.login) {
      setIsShowSider(false);
    }
  }, [pathname]);
  return (
    <LayoutContainer>
      {isShowSider && (
        <SiderContainer>
          <div className="logo" />
          <SliderMenu />
        </SiderContainer>
      )}
      <LayoutContainer isShowSider={isShowSider}>
      <Routers />
      </LayoutContainer>
    </LayoutContainer>
  );
};

export default App;
