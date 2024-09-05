"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Noticia.css"
import { FaBars, FaHouse, FaLanguage, FaPlus } from "react-icons/fa6";
import { FaUserAlt, FaSearch } from "react-icons/fa";
const InfoNoticia = () => {

  const searchParams = useSearchParams(); //se  Usa `useSearchParams` para obtener los parámetros de la URL
  const [data, setData] = useState<any | null>(null);
  const [controladorRenderMenu, setControladorRenderMenu] =
    useState(false);

  const [controladorRenderLogin, setControladorRenderLogin] =
    useState(false);

  //se obtiene el id del parámetro de la URL
  const id = searchParams.get('id');

  const ocultarInitSesion = () => {
    setControladorRenderLogin(!controladorRenderLogin);
  };
  const ocultarMenuNav = () => {
    setControladorRenderMenu(!controladorRenderMenu);
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/news/${id}`);
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <>
      <div className="fixed z-40 w-full justify-between bg-principal py-2 px-6 flex flex-row items-center">
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
      <div className="container">
        {
          data ?
            <div className='row contenedor-info'>
              <div className="w-full sm:w-9/12">
                <div id='infoPrincipal'>
                  <h1 className='titulo-noticia'>{data.title}</h1>

                  <div className='w-full border border-l-base-300'>
                    <img
                      id="noticia"
                      className="imgAsociada w-full"
                      src={data.image}
                      alt={data.title}
                    />
                  </div>

                </div>
                <div className='pt-10'>
                  <p className='descripcion-noticia'>{data.contenido_noticia}</p>
                </div>
              </div>
            </div>


            : <p>Loading...</p>
        }
      </div>
    </>
  );
};

export default InfoNoticia;
