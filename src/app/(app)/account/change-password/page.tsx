"use client"
import UpdatePassword from "@/components/user/updatePassword";
import { passwordSchema } from "@/schemas/passwordSchema";
import React, { useState } from "react";
import { z } from "zod";



export default function page() {
  return (
    <div className=" py-6">
      <UpdatePassword  />
    </div>
  );
}
