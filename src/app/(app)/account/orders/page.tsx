"use client"
import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
const invoices = [
  {
    id: "00001",
    date: "27/07/2024",
    totalAmount: "$250.00",
    address: "New Delhi, Delhi , India - 110028",
    status: "Delivered",
    action:"Cancel",
  },
  {
    id: "00002",
    date: "27/07/2024",
    totalAmount: "$250.00",
    address: "New Delhi, Delhi , India - 110028",
    status: "Delivered",
    action:"Cancel",
  },
  {
    id: "00003",
    date: "27/07/2024",
    totalAmount: "$250.00",
    address: "New Delhi, Delhi , India - 110028",
    status: "Delivered",
    action:"Cancel",
  },
]
 

export default function page() {
  return (
    <div className='w-10/12'>
    <div className="">
      <h1 className='text-center font-bold text-xl'>See Your Orders</h1>
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.address}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            <TableCell className="text-right">{invoice.status}</TableCell>
            <TableCell className="text-right">{invoice.action}</TableCell>
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
  )
}
