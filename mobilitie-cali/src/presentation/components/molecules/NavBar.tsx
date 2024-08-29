"use client";
import { AuthDataInterface, NavBarInterface } from "@/lib/interfaces";
import { useEffect, useState, type FC } from "react";
import { ItemLink } from "../atoms";
import LoginForm from "@/components/forms/login";
import { MENU_DATA_LOGIN_KEY } from "@/lib/config/menuData";

export const NavBar: FC<NavBarInterface> = ({ links, className = "" }) => {
  const ocultarInitSesion = () => {
    console.log("Hola");

    setControladorRenderLogin(!controladorRenderLogin);
  };

  const [controladorRenderLogin, setControladorRenderLogin] = useState(false);
  const [authData, setAuthData] = useState<AuthDataInterface | undefined>();

  useEffect(() => {
    const storedAuth = localStorage.getItem("user");
    if (storedAuth) {
      storedAuth as unknown as AuthDataInterface;
      // Handle the stored authentication data

      setAuthData(JSON.parse(storedAuth) as AuthDataInterface);
    }
  }, [localStorage, setAuthData]);

  return (
    <>
      <div
        className={`${"w-full h-full relative flex flex-wrap px-5 py-2"}`}
        style={{
          backgroundColor: "rgb(51, 102, 204)",
        }}
      >
        {authData != undefined && (
          <div className="w-full h-full flex">
            {links.map((linkItem, key) => {
              if (linkItem.keyLabel == MENU_DATA_LOGIN_KEY) {
                linkItem.execution = ocultarInitSesion;
              }
              console.log();

              return (
                <ItemLink
                  key={key}
                  text={linkItem.text}
                  classNameContainer={`${linkItem.classNameContainer} ${
                    linkItem.rol == undefined
                      ? "flex"
                      : authData?.user?.rol?.id == linkItem.rol
                      ? "flex"
                      : "hidden"
                  } `}
                  className={linkItem.className}
                  execution={linkItem.execution}
                  keyLabel={linkItem.keyLabel}
                  to={linkItem.to}
                />
              );
            })}
          </div>
        )}
      </div>
      {controladorRenderLogin && <LoginForm />}
    </>
  );
};
