"use client";

import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";

export function AddCategory() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const { toast } = useToast();

  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };
  //function
  const handleOnSubmit = async () => {
    try {
      const response = await axios.post("/api/category/create-category", {
        categoryName: name,
      });
      if (!response) {
        console.log("Failed to create category");
        toast({
          title: "Error creating category",
          description: "Failed to create category",
          duration: 3000,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Category created successfully",
        description: "Category created successfully",
        duration: 3000,
        variant: "default",
      });
      // console.log("Category created successfully", response.data.result);
    } catch (error) {
      toast({
        title: "Error creating category",
        description: "Failed to create category",
        duration: 3000,
        variant: "destructive",
      });
      console.error("Error creating category", error);
    } finally {
      setName("");
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <input
            required
            value={name}
            onChange={handleNameChange}
            type="text"
            className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Type your category here."
          />
          <button
            disabled={loading ? true : false}
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          >
            {loading ? "WAIT" : "ADD"}
          </button>
        </div>
      </div>
    </form>
  );
}
