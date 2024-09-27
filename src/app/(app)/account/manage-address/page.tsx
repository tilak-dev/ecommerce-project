"use client";
import CreateAddressForm from "@/components/user/AddAddess";
import AddressCard from "@/components/user/AddressCard";
import { AddressType } from "@/types/type";
import React, { useState } from "react";

export default function page() {
  const [loadting, setloading] = useState<boolean>(false);
  const [addressList, setAddressLis] = useState<AddressType[]>([]);
  const [address, setAddress] = useState<AddressType>();

  const dummyAddress: AddressType = {
    city: "New Delhi",
    state: "Delhi",
    zip: "110001",
    country: "India",
  };
  const [addresses, setAddresses] = useState<AddressType[]>([]);

  const handleAddAddress = (newAddress: AddressType) => {
    setAddresses([...addresses, newAddress]);
  };

  const handleDeleteAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
  };

  const handleDelete = () => {
    console.log("Delete button clicked!");
  };

  return (
    <div className="flex gap-x-3">
      <div className="w-1/3">
        <CreateAddressForm onAddAddress={handleAddAddress}/>
      </div>
      <div className="w-2/3 grid grid-cols-2 gap-3">
        <AddressCard address={dummyAddress} onDelete={handleDelete} />
        <AddressCard address={dummyAddress} onDelete={handleDelete} />
      </div>
    </div>
  );
}
