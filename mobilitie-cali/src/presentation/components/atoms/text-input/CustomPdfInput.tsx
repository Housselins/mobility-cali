"use client";
import { CustomTextInputInterface } from "@/lib/interfaces";
import Image from "next/image";
import { ChangeEvent, useState, type FC } from "react";

interface CustomPdfInputProps extends CustomTextInputInterface {
  selectedImage?: string;
}

export const CustomPdfInput: FC<CustomPdfInputProps> = (props) => {
  const { selectedImage, returnFile, label, ...inputProps } = props;

  const [image, setImage] = useState<string | undefined>(selectedImage);

  const convertBase64 = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtener el primer archivo seleccionado

    if (!file) return; // Si no hay archivo, salir

    if (file.type !== "application/pdf") {
      alert("Solo se permiten archivos PDF.");
      return;
    }

    const maxSizeInMB = 5; // Tamaño máximo permitido en MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convertir MB a Bytes

    if (file.size > maxSizeInBytes) {
      alert("El archivo no puede superar los 5MB.");
      return; // Si el archivo excede el tamaño permitido, mostrar alerta y salir
    }

    // Convertir el archivo a base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
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
    <div className="w-full h-full grid grid-flow-row gap-2">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}

      <input
        className="shadow appearance-none border rounded w-72 h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="file"
        accept="application/pdf"
        placeholder={label}
        {...inputProps}
        onChange={convertBase64}
      />
    </div>
  );
};
