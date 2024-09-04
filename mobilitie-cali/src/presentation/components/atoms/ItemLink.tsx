"use client";
import { LinkInterface } from "@/lib/interfaces";
import Link from "next/link";
import { type FC } from "react";

export const ItemLink: FC<LinkInterface> = ({
  text,
  className = "",
  to,
  classNameContainer = "",
  execution,
}) => {
  return (
    <>
      {!execution ? (
        <Link
          href={to ?? "/"}
          className={`flex self-center justify-center cursor-pointer px-2 py-1 ${classNameContainer}`}
        >
          <p className={`text-lg ${className}`}>{text}</p>
        </Link>
      ) : (
        <div
          onClick={() => {
            execution && execution();
          }}
          className={`flex self-center justify-center cursor-pointer px-2 py-1 mx-4 ${classNameContainer}`}
        >
          <p className={`text-lg ${className}`}>{text}</p>
        </div>
      )}
    </>
  );
};
