import LoginForm from "../features/auth/LoginForm";
import FormCopy from "../features/auth/FormCopy";

const Login = () => {
  return (
    <>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <LoginForm />
        <FormCopy />
      </div>
    </>
  );
};

export default Login;
