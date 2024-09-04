"use client";
import { AuthDataInterface, NavBarInterface } from "@/lib/interfaces";
import { useEffect, useState, type FC } from "react";
import { ItemLink } from "../atoms";
import LoginForm from "@/components/forms/login";
import { MENU_DATA_LOGIN_KEY } from "@/lib/config/menuData";

export const ModuleNavBar: FC<NavBarInterface> = ({
  links,
  className = "",
}) => {
  return (
    <div className="w-full h-full flex flex-row rounded-b-xl bg-cyan-800 ">
      {links.map((linkItem, key) => {
        return (
          <ItemLink
            key={key}
            text={linkItem.text}
            classNameContainer={`${linkItem.classNameContainer} `}
            className={`${linkItem.className} text-white`}
            execution={linkItem.execution}
            keyLabel={linkItem.keyLabel}
            to={linkItem.to}
          />
        );
      })}
    </div>
  );
};
