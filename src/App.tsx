import { Layout } from "antd";
import React, { FC, useEffect, useState } from "react";
import "antd/dist/antd.css";
import Routers from "./router";
import Sider from "antd/lib/layout/Sider";
import styled from "styled-components";
import { SliderMenu } from "./components/SiderMenu";
import PAGES from "./router/pages";
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
  const [isSHowSider, setIsSHowSider] = useState(true);
  useEffect(() => {
    if (pathname === PAGES.login) {
      setIsSHowSider(false);
    }
  }, [pathname]);
  return (
    <Layout>
      {isSHowSider && (
        <SiderContainer>
          <div className="logo" />
          <SliderMenu />
        </SiderContainer>
      )}
      <Layout style={{ marginLeft: 200 }}>
      <Routers />
      </Layout>
    </Layout>
  );
};

export default App;
