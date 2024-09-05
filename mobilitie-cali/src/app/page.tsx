"use client";
import { Toaster } from "react-hot-toast";
import { FaBars, FaHouse, FaLanguage, FaPlus } from "react-icons/fa6";
import { FaUserAlt, FaSearch } from "react-icons/fa";

import LoginForm from "../components/forms/login";
import React, { useEffect } from "react";
import { Banner } from "@/components/banner/Banner";
import { MdDelete, MdModeEdit } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CustomImageInput, CustomInput, CustomTextArea } from "@/presentation";
import axios from "axios";

export default function Home() {
  const [userInfo, setUserInfo] = React.useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("userData", userData);

    if (userData) {
      setUserInfo(JSON.parse(userData)); 
      console.log("userInfo", userInfo);

    }
  }, []);
  const ocultarInitSesion = () => {
    setControladorRenderLogin(!controladorRenderLogin);
  };
  const ocultarMenuNav = () => {
    setControladorRenderMenu(!controladorRenderMenu);
  };

  const [formValues, setFormValues] = React.useState({
    title: "",
    contenido_noticia: "",
    image: "",
  });

  const limpiarFormValues = () => {
    setFormValues({
      title: "",
      contenido_noticia: "",
      image: "",
    });
  }
  const [openAddNews, setOpenAddNews] = React.useState(false);

  const [controladorRenderMenu, setControladorRenderMenu] =
    React.useState(false);

  const [controladorRenderLogin, setControladorRenderLogin] =
    React.useState(false);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const handleNext = () => {
    if (currentIndex < arrayNewaCarousel.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const [arrayNewaCarousel, setArrayNewaCarousel] = React.useState([
    {
      id: "1",
      title: "Titulo noticia 1",
      image:
        "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    },
    {
      id: "2",
      title: "Titulo noticia 2",
      image:
        "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    },
    {
      id: "3",
      title: "Titulo noticia 3",
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: "4",
      title: "Titulo noticia 4",
      image:
        "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
    },
  ]);

  const initNews = async () => {
    try {
      const response = await axios.get("http://localhost:4000/news");
      setArrayNewaCarousel(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === arrayNewaCarousel.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, [arrayNewaCarousel.length]);

  React.useEffect(() => {
    initNews();
  }, []);

  // Obtén los dos elementos siguientes basados en el currentIndex
  const getVisibleItems = () => {
    if (currentIndex === arrayNewaCarousel.length - 1) {
      return [arrayNewaCarousel[currentIndex], arrayNewaCarousel[0]];
    }
    return arrayNewaCarousel.slice(currentIndex, currentIndex + 2);
  };

  const handleOpenAddNews = () => {
    setType("add");
    setOpenAddNews(true);
  };

  const handleClsAddNews = () => {
    setOpenAddNews(false);
  };
  const [selectNwsIdEdit, setSelectNwsIdEdit] = React.useState<string | null>(null);
  const [type, setType] = React.useState("");

  const handleOpenEditNews = async (id: string) => {
    setType("edit");
    const response = await axios.get(`http://localhost:4000/news/${id}`);
    console.log("response para editar:", response?.data);
    setOpenAddNews(true);
    setSelectNwsIdEdit(id);
    setFormValues(response?.data);

  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleTxtAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleImageChange = (image: string) => {
    setFormValues({
      ...formValues,
      image,
    });
  };

  const handleSubmit = async () => {
    console.log("Valores del formulario:", formValues);
    try {
      if (type === "edit") {
        await axios.put(`http://localhost:4000/news/${selectNwsIdEdit}`, formValues);
        await initNews();
      }
      else if (type === "add") {
        await axios.post("http://localhost:4000/news", formValues);
        await initNews();
      }
    } catch (error) {
      console.log(error);
    }
    limpiarFormValues();
    handleClsAddNews();
  };

  const [openDeleteNews, setOpenDeleteNews] = React.useState(false);
  const handleClsDltNws = () => {
    setOpenDeleteNews(false);
  };
  const [selectNwsId, setSelectNwsId] = React.useState<string | null>(null);
  const handleOpenDltNews = (id: string) => {
    setSelectNwsId(id);
    setOpenDeleteNews(true);
  };

  const handleDltNws = async () => {
    if (!selectNwsId) return; // Verificar si hay un ID seleccionado
    try {
      await axios.delete(`http://localhost:4000/news/${selectNwsId}`);
      setArrayNewaCarousel(
        arrayNewaCarousel.filter((noticia: any) => noticia.id !== selectNwsId)
      ); // Actualizar la lista de banners
      setOpenDeleteNews(false); // Cerrar el modal después de eliminar
    } catch (error) {
      console.error("Error al eliminar el noticia:", error);
    }
  };

  return (
    <main className="h-full w-full">
      <Toaster />
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
          <div id="banner" className="w-full pt-10 ">
            <Banner />
          </div>
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
          <div>
            <div className="carousel w-full">
              <div id="sld" className="carousel-item relative w-full">
                <div className="w-full flex flex-row justify-around h-60 items-center relative pt-4">

                  {userInfo && userInfo.user.rol.id === 1 && (
                    <FaPlus
                      title="Añadir nueva noticia"
                      onClick={() => handleOpenAddNews()}
                      className="text-principal absolute top-1/2 z-10 cursor-pointer w-10 "
                    />
                  )}
                  {getVisibleItems().map((carrousel) => (
                    <div
                      key={carrousel.id}
                      className="w-2/6 h-5/6 rounded-br20 shadow-xl cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 flex flex-col justify-center items-center gap-3 text-neutral-300 text-xs font-bold p-2">
                        {userInfo && userInfo.user.rol.id === 1 && (
                          <MdDelete
                            size={20}
                            title="Eliminar"
                            className="text-neutral-500"
                            onClick={() => handleOpenDltNews(carrousel.id)}
                          />
                        )}
                        {userInfo && userInfo.user.rol.id === 1 && (
                          <MdModeEdit 
                            size={20} 
                            title="Editar"
                            className="text-neutral-500"
                            onClick={() => handleOpenEditNews(carrousel.id)} />
                        )}
                      </div>
                      <img
                        className="h-3/4 rounded-t-br20 w-full object-cover"
                        src={carrousel.image}
                        alt={carrousel.title}
                      />
                      <p className="text-neutral-600 text-center py-2 text-xs">
                        {carrousel.title}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button
                    onClick={() => handlePrev()}
                    className="btn btn-circle"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() => handleNext()}
                    className="btn btn-circle"
                  >
                    ❯
                  </button>
                </div>
              </div>
            </div>
          </div>
          <footer className="text-center p-4 bg-principal text-white">
            © 2023 Copyright: Base
          </footer>
          <Dialog
            open={openAddNews}
            onClose={handleClsAddNews}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Agregar noticia"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <form>
                  <CustomInput
                    className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br20"
                    value={formValues.title}
                    onChange={handleInputChange}
                    name="title"
                    label="Titutlo de la noticia"
                  />
                  <br />

                  <CustomTextArea
                    className="bg-transparent h-40 p-4 w-full pl-4 border border-l-base-300 rounded-br20"
                    value={formValues.contenido_noticia}
                    onChange={handleTxtAreaChange}
                    name="contenido_noticia"
                    label="Contenido noticia"
                  />
                  <br />
                  <CustomImageInput returnFile={handleImageChange} />
                </form>
              </DialogContentText>
            </DialogContent>
            <DialogActions className="justify-center pb-6">
              <Button onClick={handleSubmit} variant="outlined" color="success">
                Aceptar
              </Button>
              <Button
                onClick={handleClsAddNews}
                variant="outlined"
                color="error"
              >
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDeleteNews}
            onClose={handleClsDltNws}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Eliminar imagen del banner"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Está seguro de eliminar la imagen del banner?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDltNws} variant="outlined" color="error">
                Aceptar
              </Button>
              <Button
                onClick={handleClsDltNws}
                variant="outlined"
                color="success"
              >
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
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
