"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userLogin, userSignUp } from "../action";
import { useCart } from "@/components/CartContext";

// ✅ Zod schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember_me: z.boolean(),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function AuthPage() {
  const [loading, setLoading] = React.useState(false);
  const { fetchCart } = useCart();

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
    formState: { errors: errorsSignUp },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSignIn = async (data: SignInFormValues) => {
    setLoading(true);
    try {
      await userLogin(data.email, data.password, data.remember_me);
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async (data: SignUpFormValues) => {
    setLoading(true);
    try {
      await userSignUp(data.name, data.email, data.password);
      fetchCart();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Sign in or create an account
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* ✅ Sign In */}
            <TabsContent value="signin">
              <form
                onSubmit={handleSubmitSignIn(onSignIn)}
                className="space-y-4 mt-4"
              >
                <div>
                  <Label>Email</Label>
                  <Input type="email" {...registerSignIn("email")} />
                  {errorsSignIn.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errorsSignIn.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" {...registerSignIn("password")} />
                  {errorsSignIn.password && (
                    <p className="text-sm text-red-500 mt-1">
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : null}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/* ✅ Sign Up */}
            <TabsContent value="signup">
              <form
                onSubmit={handleSubmitSignUp(onSignUp)}
                className="space-y-4 mt-4"
              >
                <div>
                  <Label>Name</Label>
                  <Input type="text" {...registerSignUp("name")} />
                  {errorsSignUp.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errorsSignUp.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" {...registerSignUp("email")} />
                  {errorsSignUp.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errorsSignUp.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" {...registerSignUp("password")} />
                  {errorsSignUp.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errorsSignUp.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : null}
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
