import React, { FC} from "react";
import "antd/dist/antd.css";
import Routers from "./router";
import Sider from "antd/lib/layout/Sider";
import styled from "styled-components";
import { Provider } from "mobx-react";
import store from "./store";
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
  return (
    <Provider {...store}>
      <Routers />
      </Provider>
  );
};

export default App;
