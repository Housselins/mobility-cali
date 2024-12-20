"use client";
import { PdfIcon, useAppDispatch } from "@/presentation";
import { setNewState } from "@/presentation/store/news/NewsSlice";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { FaBars, FaHouse, FaLanguage } from "react-icons/fa6";
import "./Noticia.css";
const InfoNoticia = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams(); //se  Usa `useSearchParams` para obtener los parámetros de la URL
  const [data, setData] = useState<any | null>(null);
  const [controladorRenderMenu, setControladorRenderMenu] = useState(false);

  const [controladorRenderLogin, setControladorRenderLogin] = useState(false);

  const [fileSize, setFileSize] = useState<string>("");
  const [downloadFile, setDownloadFile] = useState<string>("");

  //se obtiene el id del parámetro de la URL
  const id = searchParams.get("id");

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
          const response = await axios.get(`${process.env.coreApi}/news/${id}`);
          // extract content type and base64 payload from original string
          const strFile = (response.data.file = response.data.file ?? "");
          var pos = strFile.indexOf(";base64,");
          var b64 = strFile.substr(pos + 8);

          // decode base64
          var pdf = atob(b64);
          const pdfSize = `${Math.round(pdf.length / 1024)} KB`;
          const downloadFile = response.data.file;
          setFileSize(pdfSize);
          setDownloadFile(downloadFile);
          dispatch(setNewState(response.data));
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <Suspense>
      <div className="fixed w-full justify-between bg-principal py-2 px-6 flex flex-row items-center">
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
      <div className="w-full h-full bg-white flex justify-center pb-10 overflow-scroll">
        {data ? (
          <div className="row contenedor-info">
            <div className="w-full sm:w-9/12">
              <div id="infoPrincipal">
                <h1 className="titulo-noticia">{data.title}</h1>

                <div className="w-full border border-l-base-300">
                  <img
                    id="noticia"
                    className="imgAsociada w-full"
                    src={data.image}
                    alt={data.title}
                  />
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-5">
                <p>{data.contenido_noticia}</p>
                {data.file && fileSize ? (
                  <div className="w-full h-max flex flex-row justify-start gap-5">
                    <div className="w-max h-full flex self-center">
                      <PdfIcon />
                    </div>
                    <div className="w-max h-full flex flex-col justify-center self-center gap-4">
                      <Link
                        href={downloadFile}
                        target="_blank"
                        download={`${data.fileName}.pdf`}
                        className="text-center align-middle self-start text-red"
                      >
                        Descargar
                      </Link>
                      <Link
                        className="text-center align-middle self-start text-red"
                        href="news/new-pdf"
                      >
                        Ver Pdf
                      </Link>
                    </div>
                    <div className="w-max h-full flex flex-col justify-center self-center gap-4">
                      <div className="flex w-max h-max flex-row gap-2 ">
                        <p className="">{`Peso archivo: `}</p>
                        <p className="text-center align-middle self-start text-red">
                          {fileSize}
                        </p>
                      </div>
                      <div className="flex w-max h-max flex-row gap-2 ">
                        <p className="">{`Titulo: `}</p>
                        <p className="text-center align-middle self-start text-red">
                          {` ${data.fileName}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-red">
                    Esta noticia no cuenta actualmente con PDF...
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Suspense>
  );
};

export default InfoNoticia;
