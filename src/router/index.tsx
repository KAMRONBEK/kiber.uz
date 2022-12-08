import { Route,  useLocation, Routes, redirect, Navigate } from "react-router-dom"
import authRoutes from "./authRoutes"
import { useSelector } from "react-redux"
// import { animated, useTransition } from "react-spring"
import AuthLayout from "../layouts/auth/Auth.layout"
// import MainLayout from "../layouts/main/Main.layout"
// import mainRoutes from "./mainRoutes"
import LandingPage from "../pages/LandingPage"

const noAccessComponent = () => <>no access</>

// const layouts = [{ component: MainLayout, path: "/main", routes: mainRoutes }]

const AppRouter = () => {
  //@ts-ignore
  const isAuth = useSelector((state) => state.auth.isAuth)
  // const permissions = useSelector((state) => state.auth.permissions)
  const location = useLocation()
  // const transitions = useTransition(location, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  // })

  if (!isAuth)
    return (
      <Routes>
        {authRoutes.map((route, index) => (
          <Route
            path={route.path}
            key={index}
            element={<route.component />}
          />
          
        ))}
        <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
      </Routes>
    )


    return (
      <div style={{width:'100%', height:'100vh',display:'flex', alignItems:'center', justifyContent:'center', fontSize:'45px'}}>Welcome Home!</div>
    )
  // return (
  //   <Switch>
  //     {layouts.map((layout, index) => (
  //       <Route
  //         key={index}
  //         path={layout.path}
  //         render={(routeProps) => (
  //           <layout.component>
  //             {transitions((props, item) => (
  //               <animated.div style={props}>
  //                 <div style={{ position: "absolute", width: "100%" }}>
  //                   <Switch location={item}>
  //                     {layout.routes.map((route) => (
  //                       <Route
  //                         key={route.id}
  //                         path={route.path}
  //                         component={route.component}
  //                         exact
  //                       />
  //                     ))}
  //                     {/* <Redirect from="*" to="/main/docs/sender" /> */}
  //                   </Switch>
  //                 </div>
  //               </animated.div>
  //             ))}
  //           </layout.component>
  //         )}
  //       ></Route>
  //     ))}
  //     <Redirect from="/" to="/main/docs/sender" />
  //     {/* <Redirect from="*" to="/main/docs/sender" /> */}
  //   </Switch>
  // )
}

export default AppRouter
