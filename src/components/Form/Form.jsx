import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import Close from "../../assets/close.svg";

const Form = ({ header, headerText, linkText, button, register }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true); // Set initial state to true

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (register) {
      // Check if passwords match
      if (password !== confirmPassword) {
        setPasswordMatch(false);
        return;
      }
      setPasswordMatch(true);
      navigate("/matches");
    } else {
      if (password.length > 0 && email.length > 0) {
        navigate("/matches");
      }
    }
  };

  return (
    <div className="account-container">
      <Link to={"/matches"}>
        <img
          src={Close}
          alt="Close icon to go back to matches"
          className="close"
        />
      </Link>
      <h2 className="account-header">{header}</h2>
      <p className="account-text">{headerText}</p>
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
        {register && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="account-input"
            placeholder="Confirm Password"
          />
        )}
        <Link
          to={register ? "/account/login" : "/account/register"}
          className="account-link"
        >
          {linkText}
        </Link>
        <button type="submit" className="form-btn" onClick={handleSubmit}>
          {button}
        </button>
        {!passwordMatch && <p className="error">Passwords do not match.</p>}
      </form>
    </div>
  );
};

Form.propTypes = {
  header: PropTypes.string,
  headerText: PropTypes.string,
  linkText: PropTypes.string,
  button: PropTypes.string,
  register: PropTypes.bool,
};

export default Form;
