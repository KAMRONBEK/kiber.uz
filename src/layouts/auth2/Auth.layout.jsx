import "./style.scss"
import ThemeSwitcher from "../../components/ThemeSwitcher"
import Particles from "react-tsparticles"
import particlesConfig from "../../utils/particlesConfig.json"

const AuthLayout = ({ children }) => {
  const particlesInit = (main) => {}

  const particlesLoaded = (container) => {}

  return (
    <div className="AuthLayout">
      <div className="settings-block">
        <ThemeSwitcher />
      </div>
      <Particles
        id="tsparticles"
        className="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesConfig}
      />

      <div className="form-area">{children}</div>
    </div>
  )
}

export default AuthLayout
