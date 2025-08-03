"use client";
import { SignUpForm } from "@/features/signup/SignUpForm";
import { SignUpStepCards } from "@/features/signup/SignUpStepCards";

export const SignupPage = () => {
  return (
    <div>
      <SignUpStepCards step={1} />
      <SignUpForm />
    </div>
  );
};

export default SignupPage;