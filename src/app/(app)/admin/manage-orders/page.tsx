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
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { AdminOderType } from "@/types/type";

const invoices = [
  {
    id: "00001",
    customer: "Tilak devs",
    orderedProduct: "Shoes",
    date: "27/07/2024",
    totalAmount: "$250.00",
    address: "New Delhi, Delhi , India - 110028",
    status: "Delivered",
    paymentMethod: "Dabit Card",
  },
  {
    id: "00002",
    customer: "Tilak devs",
    orderedProduct: "Shoes",
    date: "27/07/2024",
    totalAmount: "$250.00",
    address: "New Delhi, Delhi , India - 110028",
    status: "Delivered",
    paymentMethod: "Dabit Card",
  },
  {
    id: "00003",
    customer: "Tilak devs",
    orderedProduct: "Shoes",
    date: "27/07/2024",
    totalAmount: "$250.00",
    address: "New Delhi, Delhi , India - 110028",
    status: "Delivered",
    paymentMethod: "Dabit Card",
  },
];

export default function page() {
  const [order, setOrder] = useState<AdminOderType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/order/get-order");
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

  // delete order
  const handleDeleteOrder = async (orderId: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/user-order/cencel-order/${orderId}`
      );
      if (!response) {
        toast({
          title: "Failed to delete order",
          description: "Please try again later",
          duration: 3000,
          variant: "destructive",
        });
        console.log("Error deleting order");
      }
      toast({
        title: "Deleted order",
        description: "Order deleted successfully",
        duration: 3000,
        variant: "default",
      });
      fetchOrders();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to delete order",
        description: "Failed to delete order due to server",
        duration: 3000,
        variant: "destructive",
      });
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="">
        <h1 className="text-center font-bold text-xl">Manage Your Orders</h1>
      </div>
      <div className="">
        <Table>
          <TableCaption>A list of recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Order Id</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="">Delgivery Date</TableHead>
              <TableHead className="">Delhivery Price </TableHead>
              <TableHead className="text-right">Delhivery Status</TableHead>
              <TableHead className="text-right">Payment Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {loading && (
              <TableRow>
                <TableCell className="text-lg">Loading...</TableCell>
              </TableRow>
            )}
            {!loading && order.length < 1 && (
              <TableRow>
                <TableCell className="text-lg">There is no Order</TableCell>
              </TableRow>
            )}
            {order &&
              order.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item._id}</TableCell>
                  <TableCell>{item.customer}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>{item.customerAddress}</TableCell>
                  <TableCell className="">
                    {item.deliveryDate.toString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.totalPrice}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.deliveryStatus}
                  </TableCell>
                  <TableCell className="text-right">{item.payment}</TableCell>
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
