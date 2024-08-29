import { LinkInterface } from "../interfaces";
import { ADMIN_ROL_ID } from "./constants";

export const MENU_DATA_LOGIN_KEY = "login";
export const MENU_DATA_LOGOUT_KEY = "logout";
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
    text: "Cerrar Sesión",
    to: "/",
    keyLabel: MENU_DATA_LOGOUT_KEY,
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
    text: "Inicio Gestion Noticia",
    to: "/news",
    classNameContainer: "",
    className: "text-center align-middle",
  },
  {
    text: "Crear Noticia",
    to: "/news/create-new",
    classNameContainer: "",
    className: "text-center align-middle",
  },
  {
    text: "Ver Noticias",
    to: "/news/find-new",
    classNameContainer: "",
    className: "text-center align-middle",
  },
];
