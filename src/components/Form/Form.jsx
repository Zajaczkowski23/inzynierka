import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import Close from "../../assets/close.svg";
import axios from "axios";

const Form = ({ header, headerText, linkText, button, register }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userExist, setUserExist] = useState(true);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (register) {
      if (password !== confirmPassword) {
        setPasswordMatch(false);
        return;
      } else {
        setPasswordMatch(true);
      }
      try {
        const response = await axios.post(
          "http://localhost:4200/api/register",
          {
            name,
            email,
            password,
          }
        );
        if (response.data.message === "User Added Successfully!") {
          navigate("/account/login");
        }
      } catch (error) {
        console.log("Error:", error.response.data);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:4200/api/login", {
          username: email,
          password,
        });
        if (response.data.message === "Login Successful!") {
          localStorage.setItem("token", response.data.token);
          console.log(response);
          navigate("/matches");
        } else if (response.data.message === "No user found!") {
          setUserExist(false);
          setPasswordMatch(true);
        } else {
          setPasswordMatch(false);
          setUserExist(true);
        }
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    }
  };

  return (
    <div className="account-container">
      <Link to={register ? "/account/login" : "/matches"}>
        <img
          src={Close}
          alt="Close icon to go back to matches"
          className="close"
        />
      </Link>
      <h2 className="account-header">{header}</h2>
      <p className="account-text">{headerText}</p>
      <form className="account-form" onSubmit={handleSubmit}>
        {register && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="account-input"
            placeholder="Username"
          />
        )}
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
        {!userExist && !register && (
          <p className="error">Ups! User do not exist.</p>
        )}
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
