"use client";
import { AuthDataInterface, NavBarInterface } from "@/lib/interfaces";
import { useEffect, useState, type FC } from "react";
import { ItemLink } from "../atoms";
import LoginForm from "@/components/forms/login";
import {
  MENU_DATA_LOGIN_KEY,
  MENU_DATA_LOGOUT_KEY,
} from "@/lib/config/menuData";
import { useRouter } from "next/navigation";

export const NavBar: FC<NavBarInterface> = ({ links, className = "" }) => {
  const router = useRouter();
  const ocultarInitSesion = () => {
    console.log("Hola");

    setControladorRenderLogin(!controladorRenderLogin);
  };
  const cleanSession = () => {
    localStorage.removeItem("user");
    setAuthData({
      access_token: undefined,
      user: undefined,
    });
    router.push("/");
  };

  const [controladorRenderLogin, setControladorRenderLogin] = useState(false);
  const [authData, setAuthData] = useState<AuthDataInterface>({
    access_token: undefined,
    user: undefined,
  });

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
        {authData && (
          <div className="w-full h-full flex">
            {links.map((linkItem, key) => {
              if (linkItem.keyLabel == MENU_DATA_LOGIN_KEY) {
                linkItem.execution = ocultarInitSesion;
                if (authData.access_token) {
                  return;
                }
              }
              if (linkItem.keyLabel == MENU_DATA_LOGOUT_KEY) {
                linkItem.execution = cleanSession;
                if (!authData.access_token) {
                  return;
                }
              }

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
