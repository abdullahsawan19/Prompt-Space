import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import GoogleIcone from "../../ui/GoogleIcone";
import GithubIcone from "../../ui/GithubIcone";
import { useSignup } from "./Auth-Hooks/useSignup";
import { useProviderAuth } from "./Auth-Hooks/useProviderAuth";

const SignupForm = () => {
  const { mutate, isPending, error: serverError } = useSignup();

  const { authWithProvider, isLoading: isProviderLoading } = useProviderAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    mutate({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="order-2 md:order-1 bg-[var(--color-grey-0)] p-8 sm:p-10 rounded-3xl shadow-[var(--shadow-md)] border border-[var(--color-grey-200)] transition-colors duration-300">
      {serverError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
          {serverError.message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Full Name"
          type="text"
          placeholder="Abdullah Mahmoud Salah"
          error={errors.fullName?.message}
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 6,
              message: "Full name must be at least 6 characters",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Full name should only contain letters",
            },
          })}
        />

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

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            },
          })}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.passwordConfirm?.message}
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
        />

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isPending || !isValid}
        >
          {isPending ? "Creating account..." : "Create Account"}
        </Button>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-grey-200)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[var(--color-grey-0)] text-[var(--color-grey-500)] transition-colors">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <GoogleIcone
            onClick={() => authWithProvider("google")}
            disabled={isProviderLoading || isPending}
          />
          <GithubIcone
            onClick={() => authWithProvider("github")}
            disabled={isProviderLoading || isPending}
          />
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-[var(--color-grey-600)]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-[var(--color-brand-600)] hover:text-[var(--color-brand-500)]"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
