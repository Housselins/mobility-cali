"use client";
import { ButtonInterface } from "@/lib/interfaces";
import { type FC } from "react";

export const PrimaryButton: FC<ButtonInterface> = (props) => {
  const { label, ...inputProps } = props;
  return (
    <button
      className="shadow appearance-none border rounded-full w-72 h-10 py-2 px-3 text-white leading-tight bg-cyan-800 hover:bg-cyan-700"
      {...inputProps}
    >
      {label}
    </button>
  );
};
