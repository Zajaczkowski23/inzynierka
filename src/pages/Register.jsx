import Form from "../components/Form/Form";

const Register = () => {
  return (
    <div className="account-page register-page">
      <Form
        header={"Register"}
        headerText={"Create New Account"}
        linkText={"Already have account? Sign in"}
        button={"Register"}
        register={true}
      />
    </div>
  );
};

export default Register;
