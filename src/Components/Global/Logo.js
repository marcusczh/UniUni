import stylesGlobal from "./Global.module.css";
import logo from "./Logo.png";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <div className={stylesGlobal.logoContainer}>
      <img
        className={stylesGlobal.logo}
        src={logo}
        alt="UniUni Logo"
        onClick={(e) => {
          e.preventDefault();
          navigate("../Homepage");
        }}
      ></img>
    </div>
  );
}

export default Logo;
