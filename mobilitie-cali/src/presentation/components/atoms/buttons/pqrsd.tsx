"use client";

import Link from "next/link";

export const PQRSDButton = () => {
  return (
    <Link
      href="/pqrsd"
      className="h-5 text-white cursor-pointer border text-xs px-2 rounded-br20 flex items-center justify-center"
    >
      <p>PQRSD</p>
    </Link>
  );
};
