"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface SignInForm {
  email: string;
  password: string;
}

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
}

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn },
  } = useForm<SignInForm>();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    watch,
    formState: { errors: errorsSignUp },
  } = useForm<SignUpForm>();

  const password = watch("password");

  const onSubmitSignIn: SubmitHandler<SignInForm> = (data) => {
    console.log("Sign In Data:", data);
    // Handle sign in logic
  };

  const onSubmitSignUp: SubmitHandler<SignUpForm> = (data) => {
    console.log("Sign Up Data:", data);
    // Handle sign up logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 font-medium text-center ${
              isSignIn ? "text-black border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setIsSignIn(true)}
          >
            SIGN IN
          </button>
          <button
            className={`flex-1 py-4 font-medium text-center ${
              !isSignIn ? "text-black border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setIsSignIn(false)}
          >
            SIGN UP
          </button>
        </div>

        <div className="p-6">
          {isSignIn ? (
            // Sign In Form
            <form
              onSubmit={handleSubmitSignIn(onSubmitSignIn)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="email@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none"
                  {...registerSignIn("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errorsSignIn.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignIn.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none pr-10"
                    {...registerSignIn("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errorsSignIn.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignIn.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Sign In
              </button>

              <div className="text-center">
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </form>
          ) : (
            // Sign Up Form
            <form
              onSubmit={handleSubmitSignUp(onSubmitSignUp)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none"
                    {...registerSignUp("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errorsSignUp.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorsSignUp.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none"
                    {...registerSignUp("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errorsSignUp.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorsSignUp.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="email@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none"
                  {...registerSignUp("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errorsSignUp.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignUp.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none pr-10"
                    {...registerSignUp("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errorsSignUp.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignUp.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="**********"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none pr-10"
                    {...registerSignUp("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errorsSignUp.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignUp.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  {...registerSignUp("newsletter")}
                />
                <label
                  htmlFor="newsletter"
                  className="ml-2 block text-sm text-gray-700"
                >
                  KEEP ME UP TO DATE WITH SPECIAL OFFERS AND PROMOTION
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
