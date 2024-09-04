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
      <div className="w-full justify-between bg-principal py-2 px-6 flex flex-row items-center">
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
          p-3"
        >
          <img
            className="py-2"
            src="https://www.cali.gov.co/movilidad/info/principal/media/bloque210342.png"
            alt="ded"
            style={{ width: "90px" }}
          />

          <ul>
            <li>
              <a href="#" className="hover:text-principal">
                Información general
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-principal">
                Datos de contacto
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-principal">
                Planeación gestión y control
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-principal">
                Participación ciudadana
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-principal">
                Contratación
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-principal">
                Tramites y servicios
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-principal">
                Información de interés
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-principal">
                Educación y cultura vial
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-principal">
                Observatorio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-principal">
                Pico y placa
              </a>
            </li>
          </ul>
        </aside>

        <div className="bg-neutral-300 w-full h-full gap-[2.75rem]">
          <Carousel />
          <div>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              voluptas quaerat totam laudantium reprehenderit exercitationem
              maiores asperiores voluptate error omnis tempora facere
              repellendus veniam magnam, dolores natus esse. Non, illum.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              quaerat, voluptas consequuntur sed incidunt veritatis possimus
              ullam dolorum culpa, error veniam aspernatur, ea quos quo nulla
              quasi magni eveniet assumenda!
            </p>
          </div>
        </div>
      </div>
      <footer className="text-center p-4 bg-principal text-white">
        © 2023 Copyright: Base
      </footer>

      <div
        className="fixed right-0 top-0 rounded-lgin w-1/3 max-w-xs shadow-2xl bg-white"
        style={{
          height: "50%",
          display: controladorRenderLogin ? "block" : "none",
        }}
      >
        <LoginForm />
      </div>
    </main>
  );
}
