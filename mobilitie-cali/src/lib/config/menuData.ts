import { LinkInterface } from "../interfaces";
import { ADMIN_ROL_ID } from "./constants";

export const MENU_DATA_LOGIN_KEY = "login";
export const MENU_DATA: LinkInterface[] = [
  {
    text: "Inicio",
    to: "/",
    classNameContainer: "col-span-1",
    className: "text-center align-middle",
  },
  {
    text: "Iniciar Sesión",
    to: "/",
    keyLabel: MENU_DATA_LOGIN_KEY,
    classNameContainer: "col-span-1",
    className: "text-center align-middle",
  },
  {
    text: "Gestión noticias",
    to: "/news",
    classNameContainer: "col-span-1",
    className: "text-center align-middle",
    rol: ADMIN_ROL_ID,
  },
];

export const NEWS_MENU_DATA: LinkInterface[] = [
  {
    text: "Crear Noticia",
    to: "/news/create-new",
    classNameContainer: "",
    className: "text-center align-middle",
  },
  {
    text: "Ver Noticias",
    to: "/news/create-new",
    classNameContainer: "",
    className: "text-center align-middle",
  },
];
