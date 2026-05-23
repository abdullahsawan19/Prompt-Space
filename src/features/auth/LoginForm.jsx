import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

import GoogleIcone from "../../ui/GoogleIcone";
import GithubIcone from "../../ui/GithubIcone";
import { useLogin } from "./Auth-Hooks/useLogin";

const LoginForm = () => {
  const { mutate, isPending, error: serverError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="order-2 md:order-1 bg-[var(--color-grey-0)] p-8 sm:p-10 rounded-3xl shadow-[var(--shadow-md)] border border-[var(--color-grey-200)] transition-colors duration-300">
      {serverError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
          {serverError}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={isPending || !isValid}
        >
          {isPending ? "Logging in..." : "Log In"}
        </Button>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-grey-200)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[var(--color-grey-0)] text-[var(--color-grey-500)] transition-colors">
              Or log in with
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <GoogleIcone />
          <GithubIcone />
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-[var(--color-grey-600)]">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-bold text-[var(--color-brand-600)] hover:text-[var(--color-brand-500)] transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
