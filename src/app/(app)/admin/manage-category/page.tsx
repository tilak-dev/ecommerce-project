"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiRespnse";
import EditModel from "@/components/admin/category/EditModel";
import { AddCategory } from "@/components/admin/category/AddCategory";

export default function page() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [catList, setCatList] = useState<Catecories[]>([]);

  //fetched data
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
        });
        return;
      }
      setCatList(response.data.data);
    } catch (error) {
      console.log("Error fetching categories", error);
      toast({
        title: "Error fetching Categories",
        description: "Failed to fetch categories",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  //handle on delete
  const handleOnDelete = async (id: string) => {
    try {
      setLoading(false);
      const response = await axios.delete<ApiResponse>(
        `/api/category/delete-category/${id}`
      );
      if (!response) {
        toast({
          title: "Delete Failed",
          description: "Failed to delete category",
          duration: 3000,
          variant: "destructive",
        });
        console.log("error in deleting");
        return;
      }
      setCatList(catList.filter((cat) => cat._id !== id));
      toast({
        title: "Deleted Successfully",
        description: response.data.message,
        duration: 3000,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting Category",
        description: error.message,
        duration: 3000,
        variant: "destructive",
      });
      console.log("Error deleting category", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="flex flex-col text-black">
      <h1 className="text-3xl text-center text-black font-bold mb-6">
        Welcome to Manage Category Section
      </h1>

      <div className="  flex justify-between items-center ">
        <div className=""><AddCategory /></div>
      </div>
      <div className="">
        <Table className="">
          <TableHeader>
            <TableRow className="">
              <TableHead>Category id</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Update</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {catList &&
              catList.map((cat) => (
                <TableRow key={cat._id}>
                  <TableCell className="font-medium">{cat._id}</TableCell>
                  <TableCell>{cat.categoryName}</TableCell>
                  <TableCell>
                    <EditModel defaultValue={cat.categoryName} id={cat._id} />
                  </TableCell>
                  <TableCell>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleOnDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {catList.length < 1 && !loading && (
          <>
            {" "}
            <h1 className="text-center py-3">There is no Category</h1>
          </>
        )}
        {loading ? (
          "Loading..."
        ) : (
          <h1 className="text-center py-3">A list of your recent Catecories</h1>
        )}
      </div>
    </div>
  );
}
