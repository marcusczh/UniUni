import stylesGlobal from "./Global.module.css";
import logo from "./Logo.png";

function Logo() {
  return (
    <div className={stylesGlobal.logoContainer}>
      <img className={stylesGlobal.logo} src={logo} alt="UniUni Logo"></img>
    </div>
  );
}

export default Logo;
