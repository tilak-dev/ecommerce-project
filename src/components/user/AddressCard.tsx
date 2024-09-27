import { AddressType } from "@/types/type";
import React from "react";

interface AddressCardProps {
  address: AddressType;
  onDelete: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, onDelete }) => {
  return (
    <div className=" ">
      <div className="flex justify-between items-center  max-w-sm mx-auto p-4 border rounded-lg shadow-lg bg-white">
        <div className="my-5 mx-3">
          <h2 className="text-xl font-semibold">
            {address.city}, {address.state}
          </h2>
          <p className="text-gray-600">
            {address.zip}, {address.country}
          </p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
