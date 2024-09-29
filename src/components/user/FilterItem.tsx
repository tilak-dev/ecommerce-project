"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { price } from "@/data/price";
import { toast } from "@/hooks/use-toast";
import { useFilterProduct } from "@/context/FilterProvider";
import { Catecories } from "@/types/type";

interface FilterItemProps {
  catList: Catecories[];
}

export default function FilterItem({catList}: FilterItemProps) {
  const [productArray, setProductArray,category, setCategory,radio, setRadio,loading, setLoading] = useFilterProduct()

  const handleCategoryChange = (categoryId: string) => {
    setCategory((catArray) =>
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
    setRadio(parsedValues);
  };

  const handleOnReset = () => {
    setCategory([]); // Clear selected categories
    setRadio(undefined); // Clear price filter
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
          {/* {loading  && catList.length && <div>Loading...</div>} */}
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
        <div className="text-center py-4">
          <button className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500" onClick={handleOnReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}