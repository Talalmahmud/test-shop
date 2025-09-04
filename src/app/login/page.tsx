"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userLogin, userSignUp } from "../action";

// ✅ Zod schemas
const signInSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
  remember_me: z.boolean(),
});

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string(),
  password: z.string().min(6),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function AuthPage() {
  // ✅ Sign In Form
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    control: controlSignIn,
    formState: { errors: errorsSignIn },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { remember_me: false },
  });

  // ✅ Sign Up Form
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    control: controlSignUp,
    formState: { errors: errorsSignUp },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSignIn = async (data: SignInFormValues) => {
    console.log("Sign In Data:", data);
    const resData = await userLogin(
      data.email,
      data.password,
      data.remember_me
    );
  };

  const onSignUp = async (data: SignUpFormValues) => {
    console.log("Sign Up Data:", data);
    const resDarta = await userSignUp(data.name, data.email, data.password);
  };

  return (
    <div className="max-w-md mx-auto mt-10 min-h-screen">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* ✅ Sign In */}
        <TabsContent value="signin">
          <form onSubmit={handleSubmitSignIn(onSignIn)} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" {...registerSignIn("email")} />
              {errorsSignIn.email && (
                <p className="text-sm text-red-500">
                  {errorsSignIn.email.message}
                </p>
              )}
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" {...registerSignIn("password")} />
              {errorsSignIn.password && (
                <p className="text-sm text-red-500">
                  {errorsSignIn.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                name="remember_me"
                control={controlSignIn}
                render={({ field }) => (
                  <Checkbox
                    id="remember"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </TabsContent>

        {/* ✅ Sign Up */}
        <TabsContent value="signup">
          <form onSubmit={handleSubmitSignUp(onSignUp)} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input type="text" {...registerSignUp("name")} />
              {errorsSignUp.name && (
                <p className="text-sm text-red-500">
                  {errorsSignUp.name.message}
                </p>
              )}
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" {...registerSignUp("email")} />
              {errorsSignUp.email && (
                <p className="text-sm text-red-500">
                  {errorsSignUp.email.message}
                </p>
              )}
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" {...registerSignUp("password")} />
              {errorsSignUp.password && (
                <p className="text-sm text-red-500">
                  {errorsSignUp.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
