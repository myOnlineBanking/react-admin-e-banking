import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
import routes from "../routes";
import { PrivateRoute } from "src/helpers/PrivateRoute";

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return !route.private ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => (
                  <>
                    <route.component {...props} />
                  </>
                )}
              />
            ) : (
              <PrivateRoute
                exact={route.exact}
                name={route.name}
                path={route.path}
                key={idx}
              >
                <route.component />
              </PrivateRoute>
            );
          })}
        </Switch>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
