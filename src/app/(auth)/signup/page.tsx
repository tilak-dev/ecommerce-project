"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/signUpSchema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/types/ApiRespnse";

const SignUpPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  //form shape
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post<ApiResponse>("/api/signup", values);
      if (!response) {
        toast({
          title: "signup Failed",
          description: "error in signup",
          duration: 3000,
        });
        throw new Error("Server Error");
      }
      toast({
        title: "Success",
        description: "Sign up successful",
      });
      console.log(response);
      form.reset();
    } catch (error) {
      console.log("error in signUpPage ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Error in signUp Page",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <div className="flex min-h-screen bg-gray-200 text-black">
        <div className="m-auto w-1/3 shadow-lg">
          <div className="bg-white p-8">
            <h2 className="text-center text-2xl mb-4">Login to Your Account</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleOnSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="">
                          <Input
                            type="Username"
                            placeholder="username"
                            className="w-full p-2  border rounded"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="">
                          <Input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2  border rounded"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl className="">
                        <div className="">
                          <Input
                            type="Password"
                            placeholder="Password"
                            className="w-full p-2  border rounded"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-green-500 text-white p-2 rounded"
                >
                  Sign In
                </Button>
              </form>
            </Form>
          </div>
          <div className="bg-green-500 text-white p-4 text-center">
            <span>New Here? </span>
            <button className="underline">Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
