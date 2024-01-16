import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = () => {
    if (email.length > 0 && password.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-header">Sign In</h2>
        <p className="login-text">Sign in to your account</p>
        <form className="account-form">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="account-input"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="account-input"
            placeholder="Password"
          />
          <p className="login-link">
            Don&apos;t have account? Create account now!
          </p>
          <Link
            className="form-btn"
            onClick={() => loginUser()}
            to={isLoggedIn ? "/matches" : "/account/login"}
          >
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
