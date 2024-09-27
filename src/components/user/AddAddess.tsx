import { AddressType } from "@/types/type";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addressSchema } from "@/schemas/addresssSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

const CreateAddressForm = () => {
  const { data: session } = useSession();
  const userId = session?.user._id;
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });
  async function onSubmit(values: z.infer<typeof addressSchema>) {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/manage-address/create-address/${userId}`,{
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
        }
      );
      if (!response) {
        console.log("Error creating address");
        toast({
          title: "Failed to create",
          description: "server error ",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Success",
        description: "Address created successfully",
        variant: "default",
      });

      form.reset();
    } catch (error: any) {
      console.error("Error creating address", error);
      toast({
        title: "Failed to create",
        description: error.message,
        variant: "destructive",
      });
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="">
      <div className="max-w-md p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-3 text-center">
          Add a New Address
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-gray-700">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      className="w-full p-2 border rounded"
                      placeholder="city"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-gray-700">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      className="w-full p-2 border rounded"
                      placeholder="state"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-gray-700">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      className="w-full p-2 border rounded"
                      placeholder="country"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-gray-700">
                    Zip Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      className="w-full p-2 border rounded"
                      placeholder="Zip Code"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className=" flex justify-center items-center">
              <Button
                disabled={loading ? true : false}
                type="submit"
                className={`${
                  loading ? "cursor-not-allowed" : ""
                } bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors`}
              >
                {" "}
                {loading ? "Wait..." : "Add Address"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateAddressForm;
