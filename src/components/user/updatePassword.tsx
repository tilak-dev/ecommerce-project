"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { passwordSchema } from "@/schemas/passwordSchema";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function UpdatePassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const id = session?.user._id;
  //form
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  //on submit form
  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    setLoading(true);
    if (!id) {
      console.log("please login first to get id");
      toast({
        title: "Login Required",
        description: "Please login first to access this page",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.put(`/api/account/change-password/${id}`, {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      if (!response) {
        console.log("Failed to update password");
        toast({
          title: "Failed",
          description:"Failed to update password" ,
          duration: 3000,
          variant: "destructive",
        });
        return;
      }

      return toast({
        title: "Updated",
        description: "Password updated successfully",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error updating password", error);
      toast({
        title: "Error updating Password",
        description: error.message,
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center h-auto ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Password
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-gray-700 font-medium mb-2">
                    Old Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                      placeholder="Enter old password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Enter your new  password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex justify-center items-centera">
              <Button
                type="submit"
                className={` ${
                  loading ? "cursor-not-allowed" : ""
                } px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              >
                {loading ? "wait..." : "Update Password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
