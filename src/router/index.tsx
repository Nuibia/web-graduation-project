import React, { FC, Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { history } from "./history";
import adminRouter from "./router-config";

const Routers: FC = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<div/>}>
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
    </Router>
  );
};

export default Routers;
