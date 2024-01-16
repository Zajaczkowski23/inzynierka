import { useState } from "react";
import Form from "../components/Form/Form";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="login-page">
      <Form
        header={"Sign In"}
        headerText={"Sign in to your account"}
        linkText={"Don't have account? Create account now!"}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default Login;
