"use client";
import CreateAddressForm from "@/components/user/AddAddess";
import AddressCard from "@/components/user/AddressCard";
import { toast } from "@/hooks/use-toast";
import { AddressType } from "@/types/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [loadting, setloading] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<AddressType[]>([]);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`/api/manage-address/get-address`);
      if (!response) {
        toast({
          title: "Failed to get address",
          description: "Failed to fetched address due to server",
          variant: "destructive",
        });
      }
      toast({
        title: "Address fetched",
        description: "Fetched address successfully",
        variant: "default",
      });
      // console.log(response.data.data);
      setAddressList(response.data.data);
    } catch (error) {
      toast({
        title: "Failed to get address",
        description: "Failed to fetched address due to server",
        variant: "destructive",
      });
      console.error("Error fetching address", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleOnDelete = async (id: string) => {
    try {
      setloading(false);
      const response = await axios.delete(
        `/api/manage-address/delete-address/${id}`
      );

      if (!response) {
        toast({
          title: "Delete Failed",
          description: "Failed to delete address",
          duration: 3000,
          variant: "destructive",
        });
        console.log("error in deleting");
        return;
      }
      setAddressList(addressList.filter((cat) => cat._id !== id));
      toast({
        title: "Deleted Successfully",
        description: "address deleted succefully",
        duration: 3000,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting Address",
        description: error.message,
        duration: 3000,
        variant: "destructive",
      });
      console.log("Error deleting address", error);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex gap-x-3">
      <div className="w-1/3">
        <CreateAddressForm />
      </div>
      {loadting && <div>Loading...</div>}
      {loadting && addressList.length < 1 && <>Your Address List is Empty</>}
      <div className="w-2/3 grid grid-cols-2 grid-rows-3 gap-3 ">
        {addressList &&
          addressList.map((address) => (
            <div className="" key={address._id}>
              <AddressCard
                _id={address._id}
                city={address.city}
                country={address.country}
                zip={address.zip}
                state={address.state}
                onDelete={handleOnDelete}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
