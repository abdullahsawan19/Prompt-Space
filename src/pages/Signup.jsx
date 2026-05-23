import FormCopy from "../features/auth/FormCopy";
import SignupForm from "../features/auth/SignupForm";

const Signup = () => {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
      <SignupForm />
      <FormCopy />
    </div>
  );
};

export default Signup;
