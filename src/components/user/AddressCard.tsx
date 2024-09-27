"use client";
import { AddressType } from "@/types/type";
import React from "react";

interface AddressCardType {
  _id: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  onDelete: (_id: string) => void;
}

const AddressCard = ({ _id,city,country,state,zip, onDelete }: AddressCardType) => {
  return (
    <div className=" ">
      <div className="flex justify-between items-center  max-w-sm mx-auto p-4 border rounded-lg shadow-lg bg-white">
        <div className="my-5 mx-3">
          <h2 className="text-xl font-semibold">
            {city}, {state}
          </h2>
          <p className="text-gray-600">
            {zip}, {country}
          </p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          onClick={() => onDelete(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
