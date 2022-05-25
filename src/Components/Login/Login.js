import { Routes, Route, Link } from "react-router-dom";
import SignupScreen from "./SingupScreen";
import LoginScreen from "./LoginScreen";
import Avatar from "./avatarphoto.png";

function Login() {
  return (
    <div>
      <div className="LoginContainer">
        <div className="header">Welcome to UniUni</div>
        <Link to="/">
          <img
            className="avatar"
            src={Avatar}
            alt="avatar"
            height={600}
            width={500}
          />
        </Link>
        <Link to="/SignUp">Sign up</Link>
        <Link to="/LogIn">Log in</Link>
      </div>
      <Routes>
        <Route path="SignUp" element={<SignupScreen />} />
        <Route path="LogIn" element={<LoginScreen />} />
      </Routes>
    </div>
  );
}

export default Login;
