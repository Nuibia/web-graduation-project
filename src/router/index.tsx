import { message } from "antd";
import React, { FC, Suspense, useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { SiderContainer } from "../App";
import { LayoutContainer } from "../components/antd-override";
import { SliderMenu } from "../components/SiderMenu";
import store from "../store";
import { history } from "./history";
import PAGES from "./pages";
import adminRouter from "./router-config";
import debounce from "lodash/debounce";

const NeedLogged = [PAGES.userInfo, PAGES.messageadd, PAGES.messageedit];
const Routers: FC = () => {
  const DataStore = store;
  const [pathName, setPathName] = useState(undefined);
  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);
  history.listen((location) => {
    setPathName(location.pathname);
  });
  useEffect(() => {
    debounce(() => {
      if (NeedLogged.includes(pathName)) {
        if (!DataStore.guid) {
          message.error("暂未登陆，请先登陆");
          history.push(PAGES.login);
        }
      }
    })();
  }, [DataStore.guid, pathName]);
  return (
    <Router history={history}>
      <LayoutContainer>
        {pathName !== PAGES.login && (
          <SiderContainer>
            <div className="logo" />
            <SliderMenu />
          </SiderContainer>
        )}
        <LayoutContainer isShowSider={pathName !== PAGES.login}>
          <Suspense fallback={<div />}>
            <Switch>
              {adminRouter.map((item) => (
                <Route
                  key={item.path}
                  path={item.path}
                  exact
                  component={item.component}
                />
              ))}
            </Switch>
          </Suspense>
        </LayoutContainer>
      </LayoutContainer>
    </Router>
  );
};

export default Routers;
