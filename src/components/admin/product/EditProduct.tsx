"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputChangedEvent } from "@/helper/InputChangeEvent";
import axios from "axios";
import { useEffect, useState } from "react";

import slugify from "slugify";
interface EditModelProps {
  id: string; // Make sure you're passing the id as a string
}

export default function EditProducts({ id }: EditModelProps) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<Catecories[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    //validations
    if (!name || !price || !description || !category || !quantity) {
      setErrorMessage("All fields are required");
      setLoading(false);
      return;
    }
    if (!imageUrl) {
      setErrorMessage("Please select an image to upload.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.put(`/api/product/update-product/${id}`, {
        name,
        price,
        slug: slugify(name.toLowerCase()),
        description,
        category,
        quantity,
        shipping: "false",
        photoLink: imageUrl,
      });
      if (!response) {
        console.log("Failed to update product");
        return;
      }
      console.log(response.data);
      if (response.data) {
        setSuccessMessage("Product update successfully!");
      }
    } catch (error) {
      setErrorMessage("Failed to update product");
    } finally {
      setLoading(false);
      setPrice("");
      setName("");
      setDescription("");
      setCategory("");
      setQuantity("");
      setPhoto(null);
      setImageUrl(null);
    }
  };
  //convertind photo to link
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (file) {
      setPhoto(file);
      console.log(file);
    }
  };
  //geting photo url
  const handleSubmitPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    if (!photo) {
      setErrorMessage("Please select an image to upload.");
      return;
    }
    const formImage = new FormData();
    formImage.append("productImage", photo);
    try {
      const response = await axios.post("/api/product/image", formImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data.image);
      if (!response) {
        console.log("Failed to upload image");
        return;
      }
      setImageUrl(response.data.image);
      console.log(response.data.image);
      if (response.data.success) {
        setSuccessMessage("image uploaded successfully now add the product");
      }
    } catch (error) {
      setErrorMessage("Failed to add product");
      console.error(error);
    } finally {
      setLoading(false);
      setPhoto(null);
    }
  };

  //fetched categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/category/all-category");
      if (!response) {
        console.log("No category");
        return;
      }
      setCategoryList(response.data.data);
    } catch (error) {
      console.log("Error fetching categories", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleOncategory = (id: string) => {
    setCategory(id);
    console.log(id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 ">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className=" bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit your Category</DialogTitle>
          <DialogDescription className="text-black">
            Make changes to your Product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-white text-black shadow-lg rounded-lg py-4 px-8 w-full max-w-sm md:max-w-md lg:max-w-lg ">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-2">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(InputChangedEvent(e))}
                required
                placeholder="Enter product name"
                className="w-full text-sm px-3 py-2 md:px-4 md:py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(InputChangedEvent(e))}
                required
                placeholder="Enter product price"
                className="w-full px-3 py-2 md:px-4 md:py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(InputChangedEvent(e))}
                required
                placeholder="Enter product description"
                className="w-full px-3 py-2 md:px-4 md:py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <div className="">
                <Select onValueChange={handleOncategory}>
                  <SelectTrigger className=" text-gray-700 font-medium ">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {!categoryList && (
                        <>first Add Category to use this method</>
                      )}
                      {categoryList.length > 0 &&
                        categoryList.map((cat) =>
                          loading ? (
                            <SelectItem key={"1"} value="loading">
                              loading...
                            </SelectItem>
                          ) : (
                            <SelectItem key={cat._id} value={cat._id}>
                              <option
                                onChange={() => handleOncategory(cat._id)}
                              >
                                {cat.categoryName}
                              </option>
                            </SelectItem>
                          )
                        )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(InputChangedEvent(e))}
                required
                placeholder="Enter product quantity"
                className="w-full px-3 py-2 md:px-4 md:py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Photo Link */}
            <div className="flex justify-between">
              <input
                type="file"
                name="productImage"
                onChange={handlePhotoChange}
                required
                placeholder="Enter product photo link"
                className="w-2/3  px-3 py-1 text-sm md:px-4 md:py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="bg-green-400 px-2.5 py-1 text-sm rounded-lg hover:bg-green-500"
                onClick={handleSubmitPhoto}
              >
                upload Image
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-1 text-sm md:py-3 rounded-md font-medium hover:bg-blue-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>

          {/* Feedback */}
          {successMessage && (
            <p className="mt-6 text-green-500 text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="mt-6 text-red-500 text-center">{errorMessage}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
