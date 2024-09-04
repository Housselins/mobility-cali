"use client";
import { TextInterface } from "@/lib/interfaces";
import { type FC } from "react";

export const Subtitle: FC<TextInterface> = ({ text, className = "" }) => {
  return <h2 className={`text-xl text-cyan-800 ${className}`}>{text}</h2>;
};
