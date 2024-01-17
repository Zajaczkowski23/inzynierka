import Form from "../components/Form/Form";

const Login = () => {
  return (
    <div className="account-page login-page">
      <Form
        header={"Sign In"}
        headerText={"Sign in to your account"}
        linkText={"Don't have account? Create account now!"}
        button={"Log in"}
        register={false}
      />
    </div>
  );
};

export default Login;
