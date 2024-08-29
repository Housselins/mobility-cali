"use client";
import { CustomTextInputInterface } from "@/lib/interfaces";
import Image from "next/image";
import { useState, type FC } from "react";

export const CustomImageInput: FC<CustomTextInputInterface> = (props) => {
  const { returnFile, label, ...inputProps } = props;

  const [image, setImage] = useState<string | null>();

  const converBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = () => {
      if (reader.result) {
        setImage(reader.result as string);
        returnFile && returnFile(reader.result as string);
      }
    };
    reader.onerror = (error) => {
      console.log("Error in file parsing base 64: ", error);
    };
  };
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
        type="file"
        accept="image/*"
        placeholder={label}
        {...inputProps}
        onChange={converBase64}
      />
      {image && (
        <Image
          width={50}
          height={50}
          className="w-20 h-20"
          alt={`loadedImage${label}`}
          src={image}
        />
      )}
    </div>
  );
};
