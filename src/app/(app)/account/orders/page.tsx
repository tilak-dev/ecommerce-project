"use client";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { userOrderType } from "@/types/type";

export default function page() {
  const [order, setOrder] = useState<userOrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user-order/get-order");
      if (!response) {
        toast({
          title: "Failed to fetch orders",
          description: "Please try again later",
          duration: 3000,
          variant: "destructive",
        });
        console.log("Error fetching orders");
      }
      toast({
        title: "Fetched orders",
        description: "Orders fetched successfully",
        duration: 3000,
        variant: "default",
      });
      // console.log(response.data.data)
      setOrder(response.data.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to fetch orders",
        description: "Failed to fetch orders due to server",
        duration: 3000,
        variant: "destructive",
      });
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="w-10/12">
      <div className="">
        <h1 className="text-center font-bold text-xl">See Your Orders</h1>
      </div>
      <div className="">
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Order Id</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Total Payment</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell className="text-center">loading...</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>There is no Order : (</TableCell>
              </TableRow>
            )}
            {order.map((or) => (
              <TableRow key={or._id}>
                <TableCell className="font-medium">{or._id}</TableCell>
                <TableCell>{or.date.toString()}</TableCell>
                <TableCell>{or.address}</TableCell>
                <TableCell className="text-right">{or.totalPrice}</TableCell>
                <TableCell className="text-right">{or.status}</TableCell>
                <TableCell className="text-right">action</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {!loading && order.length > 0 && (
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
