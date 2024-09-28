"use client";
import React from "react";

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
  return (
    <div className="">
      <div className="">
        <h1 className="text-center font-bold text-xl">See Your Orders</h1>
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
              <TableHead className="text-right">Delgivery Date</TableHead>
              <TableHead className="text-right">Delhivery Price </TableHead>
              <TableHead className="text-right">Delhivery Status</TableHead>
              <TableHead className="text-right">Payment Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.orderedProduct}</TableCell>
                <TableCell>{invoice.address}</TableCell>
                <TableCell className="text-right">{invoice.date}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
                <TableCell className="text-right">{invoice.status}</TableCell>
                <TableCell className="text-right">
                  {invoice.paymentMethod}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
