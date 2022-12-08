import AuthLayout from "../layouts/auth/Auth.layout"
import LandingLayout from "../layouts/landing/Landing.Layout"
import LandingPage from "../pages/LandingPage"
import LoginPage from "../pages/Login"
import RegistrationPage from "../pages/Login/Registration"

const authRoutes = [
  {
    component: LoginPage,
    path: "/login",
    exact: true,
    title: "Login",
    layout: AuthLayout,
  },
  {
    component: RegistrationPage,
    path: "/registration",
    exact: true,
    title: "Registration",
    layout: AuthLayout,
  },
  {
    component: LandingPage,
    path: "/",
    exact: true,
    title: "LandingPage",
    layout: LandingLayout,
  },
]

export default authRoutes
