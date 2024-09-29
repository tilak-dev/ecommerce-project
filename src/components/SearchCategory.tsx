"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCategory } from "@/context/CategoryProvide";
import { useState } from "react";
import { SearchCategorySchema } from "@/schemas/searchSchema";
import { useFilterProduct } from "@/context/FilterProvider";

export default function SearchCategory() {
  const [productArray, setProductArray,category, setCategory,radio, setRadio,loading, setLoading] = useFilterProduct()
  const [categoryStore] = useCategory();

  const form = useForm<z.infer<typeof SearchCategorySchema>>({
    resolver: zodResolver(SearchCategorySchema),
    defaultValues: {
      category: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof SearchCategorySchema>) {
    setLoading(true);
    setCategory((catArray) =>
      catArray.includes(data.category)
        ? catArray.filter((id) => id !== data.category)
        : [...catArray, data.category]
    );
    setLoading(false);
    form.reset()

  }
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex items-center space-x-2"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-56">
                      <SelectValue placeholder="Select a Category to Seach.." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryStore &&
                      categoryStore.map((cat) => (
                        <SelectItem
                          className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          key={cat._id}
                          value={cat._id}
                        >
                          {cat.categoryName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            type="submit"
          >
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
}
