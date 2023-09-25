import { Route, useLocation, Routes, Navigate, Outlet } from "react-router-dom";
import authRoutes from "./authRoutes";
import { useSelector } from "react-redux";
import { useTransitions } from "react-spring/node_modules/@react-spring/core";
import { animated } from "react-spring/node_modules/@react-spring/web";

import MainLayout from "../layouts/main/Main.layout";
import mainRoutes from "./mainRoutes";

const layouts = [{ component: MainLayout, path: "/main", routes: mainRoutes }];

const AppRouter = () => {
  const isAuth = useSelector(
    (state: { auth: { isAuth: boolean } }) => state.auth.isAuth
  );
  const location = useLocation();
  const transitions = useTransitions(location, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  if (!isAuth)
    return (
      <Routes>
        {authRoutes.map((route, index) => (
          <Route
            path={route.path}
            key={index}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
    );

  return (
    <Routes>
      {layouts.map((layout, index) => (
        <Route
          key={index}
          path={layout.path}
          element={
            <layout.component>
              {transitions((props, item) => (
                <animated.div style={props}>
                  <div style={{ position: "absolute", width: "100%" }}>
                    <Outlet />
                  </div>
                </animated.div>
              ))}
            </layout.component>
          }
        >
          {layout.routes.map((route) => {
            return (
              <Route
                key={route.id}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
        </Route>
      ))}
      <Route path="/*" element={<Navigate to="/main/docs/sender" replace />} />
    </Routes>
  );
};

export default AppRouter;
