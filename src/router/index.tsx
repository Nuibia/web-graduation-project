import React, { FC, Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { SiderContainer } from "../App";
import { LayoutContainer } from "../components/antd-override";
import { SliderMenu } from "../components/SiderMenu";
import { history } from "./history";
import adminRouter from "./router-config";

const Routers: FC = () => {
  return (
    <Router history={history}>
      <LayoutContainer>
          <SiderContainer>
            <div className="logo" />
            <SliderMenu />
          </SiderContainer>
        <LayoutContainer isShowSider={true}>
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
