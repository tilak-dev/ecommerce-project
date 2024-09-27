"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { price } from "@/data/price";
import { toast } from "@/hooks/use-toast";
import { Catecories } from "@/types/type";

interface props {
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setRadioGroup: React.Dispatch<React.SetStateAction<number[] | undefined>>;
}
export default function FilterItem({ setCategories, setRadioGroup }: props) {
  const [catList, setCatList] = useState<Catecories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //fetched data;
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/category/all-category");
      if (!response) {
        console.log("No category");
        toast({
          title: "No Categories",
          description: "No categories found",
          duration: 3000,
          variant: "destructive",
        })
        return;
      }
      setCatList(response.data.data);
      toast({
        title: "Category added",
        description: response.data.message,
        duration: 3000,
      })
      // console.log(response.data.result);
    } catch (error) {
      console.log("Error fetching categories", error);
      toast({
        title: "Error fetching Categories",
        description: "Failed to fetch categories",
        duration: 3000,
        variant: "destructive",
      })
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setCategories((catArray) =>
      catArray.includes(categoryId)
        ? catArray.filter((id) => id !== categoryId)
        : [...catArray, categoryId]
    );
    toast({
      title: "Category selected",
      description: `Category ${categoryId} selected`,
      duration: 3000,
    })
  };
  const handleOnRadioValue = (value: string) => {
    const parsedValues = value.split(",").map(Number);
    setRadioGroup(parsedValues);
  };

  const handleOnReset = () => {
    setCategories([]); // Clear selected categories
    setRadioGroup(undefined); // Clear price filter
    window.location.reload() // Refresh the page
    toast({
      title: "Filters Reset",
      description: "Filters reset",
      duration: 3000,
    })
  };

  return (
    <div className="w-full flex flex-col justify-center items-center pt-8">
      <div className="  flex flex-col gap-y-2 ">
        <div className="">
          {" "}
          <h1 className="  flex flex-col gap-y-2">Filter by Category</h1>
          <hr className="font-extrabold my-3" />
          {/* Display the category list */}
          {loading && <div>Loading...</div>}
          {catList &&
            catList.map((cat) => (
              <div key={cat._id} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id={cat._id}
                  value={cat._id}
                  onChange={() => handleCategoryChange(cat._id)}
                  className="bg-cyan-500 rounded cursor-pointer"
                />
                <label
                  htmlFor={cat.categoryName}
                  className="text-gray-700 cursor-pointer"
                >
                  {cat.categoryName}
                </label>
              </div>
            ))}
        </div>
        <div className="">
          {" "}
          <h1 className="font-extrabold my-3">Filter by Price</h1>
          <hr className="  font-extrabold my-3" />
          <div className="">
            <RadioGroup onValueChange={handleOnRadioValue}>
              {price.map((price) => (
                <div className="flex items-center space-x-2" key={price.id}>
                  <RadioGroupItem
                    value={price.array.toString()}
                    id={price.id}
                    className="bg-cyan-500"
                  />
                  <Label htmlFor={price.id}>{price.value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className="">
          <button onClick={handleOnReset}>RESET FILTERS</button>
        </div>
      </div>
    </div>
  );
}