"use client";
import { CustomTextInputInterface } from "@/lib/interfaces";
import { type FC } from "react";

export const CustomInput: FC<CustomTextInputInterface> = (props) => {
  const { label, ...inputProps } = props;
  return (
    <div>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}

      <input
        className="shadow appearance-none border rounded w-72 h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder={label}
        {...inputProps}
      />
    </div>
  );
};
