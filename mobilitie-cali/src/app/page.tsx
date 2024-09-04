"use client";
import { Toaster } from "react-hot-toast";
import { FaBars, FaHouse, FaLanguage } from "react-icons/fa6";
import { FaUserAlt, FaSearch } from "react-icons/fa";

import LoginForm from "../components/forms/login";
import React from "react";
import Carousel from "@/presentation/components/organisms/carousel";
export default function Home() {
  const ocultarInitSesion = () => {
    setControladorRenderLogin(!controladorRenderLogin);
  };
  const ocultarMenuNav = () => {
    setControladorRenderMenu(!controladorRenderMenu);
  };

  const [controladorRenderMenu, setControladorRenderMenu] =
    React.useState(false);

  const [controladorRenderLogin, setControladorRenderLogin] =
    React.useState(false);

  return (
    <main className="h-full w-full">
      <Toaster />
      <div className="fixed z-10 w-full justify-between bg-principal py-2 px-6 flex flex-row items-center">
        <div className="flex flex-row items-center space-x-2">
          <FaBars
            style={{ color: "white", cursor: "pointer" }}
            onClick={ocultarMenuNav}
          />
          <img
            className="w-20"
            src="https://www.cali.gov.co/movilidad/info/principal/media/bloque214959.png"
            alt=""
          />
        </div>

        <div className="flex flex-row space-x-2">
          <FaLanguage style={{ color: "white" }} />
          <FaSearch style={{ color: "white" }} />
          <FaUserAlt
            style={{ color: "white", cursor: "pointer" }}
            onClick={ocultarInitSesion}
          />
          <FaHouse style={{ color: "white" }} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center h-full w-full">
        <aside
          style={{ display: controladorRenderMenu ? "block" : "none" }}
          className="bg-menuLateral w-1/5 h-full
          px-3 pt-10"
        >
          <img
            className="py-2"
            src="https://www.cali.gov.co/movilidad/info/principal/media/bloque210342.png"
            alt="ded"
            style={{ width: "90px" }}
          />

          <ul>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Información general
              </a>
            </li>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Datos de contacto
              </a>
            </li>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Planeación gestión y control
              </a>
            </li>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Participación ciudadana
              </a>
            </li>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Contratación
              </a>
            </li>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Tramites y servicios
              </a>
            </li>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Información de interés
              </a>
            </li>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Educación y cultura vial
              </a>
            </li>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Observatorio
              </a>
            </li>
            <li>
              <a href="#" className="text-base hover:text-principal">
                Pico y placa
              </a>
            </li>
          </ul>
        </aside>

        <div className="bg-white w-full h-full gap-[2.75rem] overflow-y-auto">
          <Carousel />
          <br />
          <div className="w-full p-4 bg-white flex flex-row gap-5">
            <div className="w-3/4 p-4 gap-4 rounded-br20 bg-principal flex flex-row">
              <div className="2/4">
                <img
                  className="rounded-br20"
                  src="https://www.cali.gov.co/movilidad/publicaciones/182628/10-agentes-de-transito-se-capacitan-en-bogota-para-fortalecer-la-seguridad-vial-en-cali/info/principal/media/pubInt/thumbs/thpub_700X400_182628.jpg"
                  alt=""
                />
              </div>
              <div className="w-2/4">
                <p className="text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Magnam, laborum. Tempori
                </p>
              </div>
            </div>
            <div className="bg-white w-1/4 relative rounded-br20">
              <img
                className="w-full h-full object-cover rounded-br20"
                src="https://www.cali.gov.co/movilidad/publicaciones/182709/trabajo-conjunto-entre-movilidad-y-direccion-de-transito-y-transporte-logra-resultados-exitosos-se-han-impuesto-3739-notificaciones/info/principal/media/pubInt/thumbs/thpub_700X400_182709.jpg"
                alt=""
              />

              <div className="absolute rounded-b-br20 bottom-0 left-0 h-1/4 flex items-center text-center bg-principalTransparente">
                <p className="text-white">
                  repellendus veniam magnam, dolores natus esse. Non, illum.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-row pt-4 pb-4 justify-around">
            <div className="w-1/4 relative rounded-br20">
              <img
                className="w-full h-full object-cover rounded-br20"
                src="https://www.cali.gov.co/movilidad/publicaciones/182709/trabajo-conjunto-entre-movilidad-y-direccion-de-transito-y-transporte-logra-resultados-exitosos-se-han-impuesto-3739-notificaciones/info/principal/media/pubInt/thumbs/thpub_700X400_182709.jpg"
                alt=""
              />

              <div className="absolute p-2 flex flex-col justify-end rounded-b-br20 bottom-0 left-0 h-3/4">
                <p className="text-white text-xs text-left mb-8 font-bold">
                  repellendus veniam magnam, dolores natus esse. Non, illum.
                </p>
                <button className="text-white w-2/4 text-xs py-2 px-3 rounded-br20 bg-principal font-semibold">
                  Saber más
                </button>
              </div>
            </div>
            <div className="w-1/3 relative rounded-br20">
              <img
                className="w-full h-full object-cover rounded-br20"
                src="https://www.cali.gov.co/movilidad/publicaciones/182709/trabajo-conjunto-entre-movilidad-y-direccion-de-transito-y-transporte-logra-resultados-exitosos-se-han-impuesto-3739-notificaciones/info/principal/media/pubInt/thumbs/thpub_700X400_182709.jpg"
                alt=""
              />

              <div className="absolute p-2 flex flex-col justify-end rounded-b-br20 bottom-0 left-0 h-3/4">
                <p className="text-white text-xs text-left mb-8 font-bold">
                  repellendus veniam magnam, dolores natus esse. Non, illum.
                </p>
                <button className="text-white w-2/4 text-xs py-2 px-3 rounded-br20 bg-principal font-semibold">
                  Saber más
                </button>
              </div>
            </div>
            <div className="w-1/4 relative rounded-br20">
              <img
                className="w-full h-full object-cover rounded-br20"
                src="https://www.cali.gov.co/movilidad/publicaciones/182709/trabajo-conjunto-entre-movilidad-y-direccion-de-transito-y-transporte-logra-resultados-exitosos-se-han-impuesto-3739-notificaciones/info/principal/media/pubInt/thumbs/thpub_700X400_182709.jpg"
                alt=""
              />

              <div className="absolute p-2 flex flex-col justify-end rounded-b-br20 bottom-0 left-0 h-3/4">
                <p className="text-white text-xs text-left mb-8 font-bold">
                  repellendus veniam magnam, dolores natus esse. Non, illum.
                </p>
                <button className="text-white w-2/4 text-xs py-2 px-3 rounded-br20 bg-principal font-semibold">
                  Saber más
                </button>
              </div>
            </div>
          </div>
          <footer className="text-center p-4 bg-principal text-white">
            © 2023 Copyright: Base
          </footer>
        </div>
      </div>

      <div
        className="fixed right-0 z-20 top-0 rounded-lgin w-1/3 max-w-xs shadow-2xl bg-white"
        style={{
          height: "50%",
          display: controladorRenderLogin ? "" : "none",
        }}
      >
        <LoginForm />
      </div>
    </main>
  );
}
