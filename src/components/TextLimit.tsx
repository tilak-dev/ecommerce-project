"use client";
import React from "react";

interface TextLimitType {
  text: string;
  limit: number;
}

export default function TextLimit({ text, limit }: TextLimitType) {
  const truncatedText =
    text.length > limit ? text.slice(0, limit) + "..." : text;//learn about text limit
  return <>{truncatedText}</>;
}