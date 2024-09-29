"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { updateOrder } from "@/data/order";

export default function page() {
  const [order, setOrder] = useState<AdminOderType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<string>();
  const [userOrderId, setUserOrderId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

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
  }, [order.length]);

  //handle on update Order
   const handleUpdateOrder = async (orderId: string) => {
    // console.log(orderId)
    try {
      setLoading(true);
      const response = await axios.put(`/api/order/update-order/${orderId}`, {
        deliveryStatus: active,
        userId :"66f5f91d45b0d7ed42d9a34a",
        userOrderId: "66f8afe4520352fc0cadb872",
      });
      if (!response) {
        toast({
          title: "Failed to update order",
          description: "Please try again later",
          duration: 3000,
          variant: "destructive",
        });
        console.log("Error in updating order");
      }
      toast({
        title: "Order updated successfully",
        description: "Order updated successfully",
        duration: 3000,
        variant: "default",
      });
      fetchOrders();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to update order",
        description: "Failed to update order due to server",
        duration: 3000,
        variant: "destructive",
      });
      console.log(error);
    }finally{
      setLoading(false);
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
          <TableHeader className=" text-xs">
            <TableRow>
              <TableHead className="">Order Id</TableHead>
              {/* <TableHead>Customer</TableHead> */}
              <TableHead>Order</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="">Delivery Date</TableHead>
              <TableHead className="">Delivery Price </TableHead>
              <TableHead className="text-center">Delhivery Status</TableHead>
              <TableHead className="text-right">Payment Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {loading && (
              <TableRow>
                <TableCell className="text-lg">Loading...</TableCell>
              </TableRow>
            )}
            {!loading && !order.length && (
              <TableRow>
                <TableCell className="text-lg">There is no Order</TableCell>
              </TableRow>
            )}
            {order &&
              order.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item._id}</TableCell>
                  {/* <TableCell>{item.customer}</TableCell> */}
                  <TableCell>{item.order}</TableCell>
                  <TableCell>{item.customerAddress}</TableCell>
                  <TableCell className="">
                    {item.deliveryDate.toString()}
                  </TableCell>
                  <TableCell className="text-center">
                    ${item.totalPrice}.00
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center gap-x-2">
                      <div className="">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                            value={active}
                              className={`
                                 ${
                              item.deliveryStatus === "pending" &&
                                "bg-amber-700 text-white hover:bg-amber-700"
                              } ${
                                item.deliveryStatus === "processing" &&
                                "bg-green-400 text-white  hover:bg-green-500"
                              }  ${
                                item.deliveryStatus === "shipped" &&
                                "bg-blue-600 hover:bg-blue-700 text-white"
                              } 
                           ${
                            item.deliveryStatus === "delivered" &&
                             "bg-green-700 hover:bg-green-700  text-white"
                           }  
                           ${
                            item.deliveryStatus === "cancelled" &&
                             "bg-red-700 hover:bg-red-700 text-white"
                           }  
                                ${
                                active === "pending" &&
                                "bg-amber-700 text-white hover:bg-amber-700"
                              } ${
                                active === "processing" &&
                                "bg-green-500 text-white"
                              }  ${
                                active === "shipped" &&
                                "bg-blue-600 hover:bg-blue-700 text-white"
                              } 
                           ${
                             active === "delivered" &&
                             "bg-green-700 hover:bg-green-700  text-white"
                           }  
                           ${
                             active === "cancelled" &&
                             "bg-red-700 hover:bg-red-700 text-white"
                           }  
                            
                          focus:border-none focus:outline-none  placeholder:text-black `}
                            >
                              {active ? active : item.deliveryStatus}
                              
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={active}
                              onValueChange={setActive}
                            >
                              {updateOrder &&
                                updateOrder.map((item) => (
                                  <DropdownMenuRadioItem
                                    key={item.id}
                                    value={item.value}
                                  >
                                    {item.value}
                                  </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="">
                        <Button
                          className="bg-indigo-600 hover:bg-indigo-700"
                          onClick={() => handleUpdateOrder(item._id)}
                          disabled={loading ? true : false}
                        >
                          Update
                        </Button>
                      </div>
                    </div>

                    {/* {item.deliveryStatus} */}
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
