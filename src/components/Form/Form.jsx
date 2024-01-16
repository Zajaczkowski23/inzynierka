import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Form = ({ header, headerText, linkText, isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    if (email.length > 0 && password.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">{header}</h2>
      <p className="login-text">{headerText}</p>
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
        <p className="login-link">{linkText}</p>
        <Link
          className="form-btn"
          onClick={() => loginUser()}
          to={isLoggedIn ? "/matches" : "/account/login"}
        >
          Log In
        </Link>
      </form>
    </div>
  );
};

Form.propTypes = {
  header: PropTypes.string,
  headerText: PropTypes.string,
  linkText: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
};

export default Form;
