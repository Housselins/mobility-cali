"use client";
import { CustomTextAreaInterface } from "@/lib/interfaces";
import { type FC } from "react";

export const CustomTextArea: FC<CustomTextAreaInterface> = (props) => {
  const { label, ...inputProps } = props;
  return (
    <div>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}

      <textarea
        className="shadow appearance-none border rounded w-96 h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder={label}
        {...inputProps}
      />
    </div>
  );
};
