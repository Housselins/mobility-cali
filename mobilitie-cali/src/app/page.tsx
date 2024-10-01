"use client";
import { Banner } from "@/components/banner/Banner";
import {
  CreateNewInterface,
  NewInterface,
  SocialMediaInterface,
} from "@/domain/models";
import CreateNewUseCase from "@/domain/usecases/news/create-new.use.case";
import FindNewUseCase from "@/domain/usecases/news/find-new.use.case";
import CreateSocialMediaUseCase from "@/domain/usecases/social-media/create-social-media.use.case";
import GetSocialMediaUseCase from "@/domain/usecases/social-media/get-social-media.use.case";
import { appContainer, USECASES_TYPES } from "@/infrastructure/ioc";
import {
  CustomImageInput,
  CustomInput,
  CustomPdfInput,
  CustomTextArea,
} from "@/presentation";
import { PQRSDButton } from "@/presentation/components/atoms/buttons/pqrsd";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { isEmptyArray, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { FaBars, FaHouse, FaPlus } from "react-icons/fa6";
import {
  MdDelete,
  MdModeEdit,
  MdOutlineAdd,
  MdStar,
  MdUploadFile,
} from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { MenuCentral } from "@/components/menu-central/MenuCentral";
import { Footer } from "@/components/footer/Footer";
import LoginForm from "../components/forms/login";
type FormSocialMediaValues = {
  name?: string;
  url?: string;
  image?: string;
  isEnabled?: boolean;
};
type FormSocialMediaProps = {
  newToEdit?: SocialMediaInterface;
};

export default function Home() {
  // ==================== INSTANCES OF USE CASES
  const router = useRouter();
  // Create Social Media
  const createSocialMediaUseCase = appContainer.get<CreateSocialMediaUseCase>(
    USECASES_TYPES._CreateSocialMediaUseCase
  );
  // Get Social Media
  const getSocialMediaUseCase = appContainer.get<GetSocialMediaUseCase>(
    USECASES_TYPES._GetSocialMediaUseCase
  );
  // Find News
  const getNewsUseCase = appContainer.get<FindNewUseCase>(
    USECASES_TYPES._FindNewUseCase
  );
  // Update or Create New
  const createNewUseCase = appContainer.get<CreateNewUseCase>(
    USECASES_TYPES._CreateNewUseCase
  );

  const [isModify, setIsModify] = React.useState<any>(null);
  const [selectedSocialMedia, setSelectedSocialMedia] =
    React.useState<SocialMediaInterface>();
  const [socialMediaData, setSocialMediaData] = useState<
    SocialMediaInterface[]
  >([]);

  // ==================== INIT FORM DATA

  const initialFormValues: FormSocialMediaValues = {
    name: "",
    url: "",
    image: "",
    isEnabled: true,
  };

  // ==================== FORMIK SCHEMES

  const schema = Yup.object().shape({
    name: Yup.string().required("Campo alt obligatorio *"),
    image: Yup.string().required("Campo imagen obligatorio *"),
    url: Yup.string().required("Campo link obligatorio *"),
  });

  const formikForm = useFormik({
    initialValues: initialFormValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      // Triggers validations
      const validateFomr = await formikForm.validateForm();
      // Catch errors array
      const errorsInForm = Object.values(validateFomr);

      if (!isEmptyArray(errorsInForm)) {
        toast(
          (t) => (
            <div style={{ color: "#fff" }}>
              <strong>Error!</strong>
              <p>
                No se pudo crear la noticia por validaciones del formulario.
              </p>
            </div>
          ),
          {
            style: {
              backgroundColor: "red",
              color: "#fff",
            },
            icon: "❌",
            duration: 3000,
          }
        );
        return;
      }
      // DELETE

      if (openAddRds.isModify) {
        const resultModifyRedUseCase = await createSocialMediaUseCase.execute(
          values.name!,
          values.url!,
          values.image!,
          openAddRds.selected.id,
          values.isEnabled
        );

        if (resultModifyRedUseCase) {
          toast(
            (t) => (
              <div style={{ color: "#fff" }}>
                <strong>Exito!</strong>
                <p>Se pudo editar la red Social.</p>
              </div>
            ),
            {
              style: {
                backgroundColor: "green",
                color: "#fff",
              },
              duration: 3000,
            }
          );
        } else {
          toast(
            (t) => (
              <div style={{ color: "#fff" }}>
                <strong>Error!</strong>
                <p>No se pudo editar la red Social.</p>
              </div>
            ),
            {
              style: {
                backgroundColor: "red",
                color: "#fff",
              },
              icon: "❌",
              duration: 3000,
            }
          );
        }
      }
      // CREATE
      else {
        const resultCreateNewUseCase = await createSocialMediaUseCase.execute(
          values.name!,
          values.url!,
          values.image!
        );

        if (resultCreateNewUseCase) {
          toast(
            (t) => (
              <div style={{ color: "#fff" }}>
                <strong>Exito!</strong>
                <p>Se pudo crear la red Social.</p>
              </div>
            ),
            {
              style: {
                backgroundColor: "green",
                color: "#fff",
              },
              duration: 3000,
            }
          );
        } else {
          toast(
            (t) => (
              <div style={{ color: "#fff" }}>
                <strong>Error!</strong>
                <p>No se pudo crear la red Social.</p>
              </div>
            ),
            {
              style: {
                backgroundColor: "red",
                color: "#fff",
              },
              icon: "❌",
              duration: 3000,
            }
          );
        }
      }
      setOpenAddRds({ isModify: false, open: false, selected: { id: 0 } });
      await getSocialMedia();
    },
  });

  const [userInfo, setUserInfo] = React.useState<any>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado para la carga

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUserInfo(JSON.parse(userData));
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
  const [pdfFormValues, setPdfFormValues] = React.useState({
    id: 0,
    title: "",
    contenido_noticia: "",
    image: "",
    pdfName: "",
    pdfFile: "",
    pdfDescription: "",
  });

  const limpiarFormValues = () => {
    setFormValues({
      title: "",
      contenido_noticia: "",
      image: "",
    });
  };
  const limpiarPdfFormValues = () => {
    setPdfFormValues({
      id: 0,
      title: "",
      contenido_noticia: "",
      image: "",
      pdfName: "",
      pdfFile: "",
      pdfDescription: "",
    });
  };
  const [openAddNews, setOpenAddNews] = React.useState(false);
  const [addFile, setAddFile] = React.useState(false);
  const handleOpenAddFile = async (id: string) => {
    const response: NewInterface = await axios
      .get(`http://localhost:4000/news/${id}`)
      .then((data) => data.data)
      .catch();

    const pdfFormValues = {
      id: response.id,
      title: response.title ?? "",
      contenido_noticia: response.contenido_noticia ?? "",
      image: response.image ?? "",
      pdfName: response.fileName ?? "",
      pdfFile: response.file ?? "",
      pdfDescription: response.fileDescription ?? "",
    };
    setPdfFormValues(pdfFormValues);
    setAddFile(true);
  };
  const handlePdfSubmit = async () => {
    if (
      !pdfFormValues.id ||
      !pdfFormValues.title ||
      !pdfFormValues.image ||
      !pdfFormValues.contenido_noticia ||
      !pdfFormValues.pdfName ||
      !pdfFormValues.pdfFile ||
      !pdfFormValues.pdfDescription
    ) {
      setError("Por favor, completa todos los campos obligatorios");
      return;
    }
    setLoading(true);
    try {
      const updateableNewPdf: CreateNewInterface = {
        id: pdfFormValues.id,
        title: pdfFormValues.title,
        contenido_noticia: pdfFormValues.contenido_noticia,
        file: pdfFormValues.pdfFile,
        fileName: pdfFormValues.pdfName,
        fileDescription: pdfFormValues.pdfDescription,
      };
      await axios.post(`http://localhost:4000/news`, updateableNewPdf);
      await initNews();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    handleClsAddFile();
  };
  const handleClsAddFile = () => {
    limpiarPdfFormValues();
    setError(null);
    setAddFile(false);
  };
  const handlePdfChange = (pdf: string) => {
    setPdfFormValues({
      ...pdfFormValues,
      pdfFile: pdf,
    });
  };
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
  const [arrayNewaCarousel, setArrayNewaCarousel] = React.useState<
    NewInterface[]
  >([]);
  const [attachedNews, setAttachedNews] = useState<NewInterface[]>([]);
  const initNews = async () => {
    try {
      const response = await getNewsUseCase.execute(
        userInfo?.access_token ?? "token"
      );
      /*const attachedResponse = await getNewsUseCase.execute(
        userInfo?.access_token ?? "token",
        { attached: true }
      );*/

      setArrayNewaCarousel(response ? response : []);

      /*if (attachedResponse) {
        const filteredAttachedNews = attachedResponse.filter(news => news.attached === true);
        setAttachedNews(filteredAttachedNews.slice(0, 3));
      } else {
        setAttachedNews([]);
      }*/
      //setAttachedNews(attachedResponse ? attachedResponse.slice(0, 3) : []);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const initNewsOrder = async () => {
    try {

      const attachedResponse = await getNewsUseCase.execute(
        userInfo?.access_token ?? "token",
        { attached: true }
      );
      if (attachedResponse) {
        const filteredAttachedNews = attachedResponse.filter(news => news.attached === true);
        setAttachedNews(filteredAttachedNews.slice(0, 3));
      } else {
        setAttachedNews([]);
      }
    } catch (error) {
      console.error(error);
    }
  }


  /*React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === arrayNewaCarousel.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, [arrayNewaCarousel]);*/

  React.useEffect(() => {
    initNews();
    getSocialMedia();
  }, []);

  // Obtén los dos elementos siguientes basados en el currentIndex
  const getVisibleItems = (newArray: NewInterface[]) => {
    if (!Array.isArray(newArray) || newArray.length === 0) {
      return [];
    }

    // Verificar que currentIndex esté dentro del rango
    if (currentIndex >= newArray.length || currentIndex < 0) {
      console.warn("currentIndex fuera de rango:", currentIndex);
      return [];
    }

    if (currentIndex === newArray.length - 1) {
      return [newArray[currentIndex], newArray[0]];
    }

    return newArray.slice(currentIndex, currentIndex + 2);
  };

  const handleOpenAddNews = () => {
    setType("add");
    setTilte("Añadir noticia");
    setOpenAddNews(true);
  };

  const handleClsAddNews = () => {
    limpiarFormValues();
    setError(null);
    setOpenAddNews(false);
  };

  const [selectNwsIdEdit, setSelectNwsIdEdit] = React.useState<string | null>(
    null
  );

  const [type, setType] = React.useState("");
  const [tilte, setTilte] = React.useState("");

  const [openAddRds, setOpenAddRds] = React.useState({
    open: false,
    isModify: false,
    selected: {
      id: 0,
    },
  });
  const handleCloseRds = () => {
    formikForm.setFieldValue("isEnabled", true, true);
    formikForm.setFieldValue("name", "", true);
    formikForm.setFieldValue("image", "", true);
    formikForm.setFieldValue("url", "", true);
    setOpenAddRds({
      open: false,
      isModify: false,
      selected: {
        id: 0,
      },
    });
  };

  const handleOpenEditNews = async (id: string) => {
    setType("edit");
    setTilte("Editar noticia");
    const response = await axios.get(`http://localhost:4000/news/${id}`);
    setOpenAddNews(true);
    setSelectNwsIdEdit(id);
    setFormValues(response?.data);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handlePdfInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPdfFormValues({
      ...pdfFormValues,
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
  const handlePdfTxtAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPdfFormValues({
      ...pdfFormValues,
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
    if (
      !formValues.title ||
      !formValues.image ||
      !formValues.contenido_noticia
    ) {
      setError("Por favor, completa todos los campos obligatorios");
      return;
    }
    setLoading(true);
    try {
      if (type === "edit") {
        await axios.put(
          `http://localhost:4000/news/${selectNwsIdEdit}`,
          formValues
        );
        await initNews();
      } else if (type === "add") {
        await axios.post("http://localhost:4000/news", formValues);
        await initNews();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  //  ==================== Get All Social Media
  const getSocialMedia = async () => {
    const result = await getSocialMediaUseCase.execute();

    if (Array.isArray(result)) setSocialMediaData(result);
  };

  const startDrag = (evt: any, newDrag: any) => {
    // Guardar el índice del elemento que se está arrastrando
    evt.dataTransfer.setData('draggedIndex', attachedNews.findIndex(item => item.id === newDrag.id));
  };

  const dragginOver = (evt: any) => {
    // Evitar que el comportamiento por defecto bloquee el evento drop
    evt.preventDefault();
  };

  const onDrop = (evt: any, list: any) => {
    evt.preventDefault();

    // Obtener el índice del elemento que se está arrastrando
    const draggedIndex = evt.dataTransfer.getData('draggedIndex');

    // Obtener el índice del elemento sobre el que se suelta
    const dropIndex = list.findIndex((item: any) => item.id === evt.target.closest('div[draggable]').getAttribute('data-id'));

    if (draggedIndex !== dropIndex) {
      const newAttachedNews = [...attachedNews];

      // Intercambiar las posiciones
      const [movedItem] = newAttachedNews.splice(draggedIndex, 1);
      newAttachedNews.splice(dropIndex, 0, movedItem);

      // Actualizar el estado con el nuevo orden
      setAttachedNews(newAttachedNews);
      // Guarda el nuevo orden en localStorage
      localStorage.setItem('newsOrder', JSON.stringify(newAttachedNews));
    }
  };

  useEffect(() => {
    const storedOrder = localStorage.getItem('newsOrder');
    if (storedOrder) {
      console.log('Stored order:', storedOrder);
      setAttachedNews(JSON.parse(storedOrder));
    } else {
      initNewsOrder(); // Llamar a la función para obtener noticias si no hay nada en localStorage
    }
  }, []);

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

        <div className="flex flex-row space-x-2 items-center">
          {socialMediaData.map((red) => (
            <div className="flex flex-col">
              {userInfo?.access_token && (
                <MdModeEdit
                  title="Editar"
                  className="h-5 text-white cursor-pointer"
                  onClick={() => {
                    formikForm.setFieldValue("isEnabled", true, true);
                    formikForm.setFieldValue("name", red.name, true);
                    formikForm.setFieldValue("image", red.image, true);
                    formikForm.setFieldValue("url", red.url, true);
                    setOpenAddRds({
                      open: true,
                      isModify: true,
                      selected: {
                        id: red.id!,
                      },
                    });
                  }}
                />
              )}
              <a href={red.url} target="_blank">
                <img
                  className="w-5 h-5 cursor-pointer"
                  src={red.image}
                  alt={red.name}
                />
              </a>
            </div>
          ))}

          {userInfo?.access_token && (
            <MdOutlineAdd
              title="Editar"
              className="h-5 text-white cursor-pointer"
              onClick={() =>
                setOpenAddRds({
                  open: true,
                  isModify: false,
                  selected: {
                    id: 0,
                  },
                })
              }
            />
          )}
        </div>

        <div className="flex flex-row space-x-2 items-center">
          <PQRSDButton />
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
          <div className="pt-10">
            <MenuCentral />
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

          <div className="bg-white flex flex-row pt-4 pb-4 justify-around"           
            onDragOver={(evt => dragginOver(evt))}
            onDrop={(evt => onDrop(evt, attachedNews))}>
            {attachedNews.map((attachedNew) => {
              return (
                <div
                  className="w-1/4 relative rounded-br20"
                  key={attachedNew.id}
                  draggable
                  data-id={attachedNew.id}
                  onDragStart={(evt) => startDrag(evt, attachedNew)}
                >

                  <div className="absolute top-0 right-0 flex flex-col justify-center items-center gap-3 text-neutral-300 text-xs font-bold p-2">
                    {userInfo && userInfo.user.rol.id === 1 && (
                      <MdDelete
                        size={20}
                        title="Eliminar"
                        className="text-neutral-500"
                        onClick={() =>
                          handleDltNws()
                        }
                      />
                    )}
                    {userInfo && userInfo.user.rol.id === 1 && (
                      <MdModeEdit
                        size={20}
                        title="Editar"
                        className="text-neutral-500"
                        onClick={() =>
                          handleOpenEditNews(attachedNew.id.toString())
                        }
                      />
                    )}
                    {userInfo && userInfo.user.rol.id === 1 && (
                      <MdStar
                        size={20}
                        title="Fijar"
                        className={`${attachedNew.attached
                          ? "text-yellow"
                          : "text-neutral-500"
                          } bg-white rounded-full cursor-pointer z-50`}
                        onClick={async () => {
                          await createNewUseCase
                            .execute(
                              attachedNew.title!,
                              userInfo?.access_token,
                              attachedNew.contenido_noticia,
                              attachedNew.image,
                              attachedNew?.id,
                              !attachedNew.attached,
                              true
                            )
                            .then(async () => {
                              await initNews();
                            });
                        }}
                      />
                    )}
                    {userInfo && userInfo.user.rol.id === 1 && (
                      <MdUploadFile
                        size={20}
                        title="Editar"
                        className="text-neutral-500 bg-white rounded-full cursor-pointer z-50"
                        onClick={() =>
                          handleOpenAddFile(attachedNew.id.toString())
                        }
                      />
                    )}
                  </div>
                  <img
                    className="w-full h-full object-cover rounded-br20"
                    src={attachedNew.image}
                    alt={attachedNew.title}
                  />

                  <div className="absolute p-2 flex flex-col justify-end rounded-b-br20 bottom-0 left-0 h-3/4">
                    <p className="text-white text-xs text-left mb-8 font-bold">
                      {attachedNew.title}
                    </p>
                    <button
                      className="text-white w-2/4 text-xs py-2 px-3 rounded-br20 bg-principal font-semibold"
                      onClick={() => {
                        router.push(`/noticia?id=${attachedNew.id}`);
                      }}
                    >
                      Saber más
                    </button>
                  </div>
                </div>
              );
            })}
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
                  {arrayNewaCarousel &&
                    getVisibleItems(arrayNewaCarousel).map((carrousel: any) => {
                      return (
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
                                onClick={() => handleOpenEditNews(carrousel.id)}
                              />
                            )}
                            {userInfo && userInfo.user.rol.id === 1 && (
                              <MdStar
                                size={20}
                                title="Fijar"
                                className={`${carrousel.attached
                                  ? "text-yellow"
                                  : "text-neutral-500"
                                  } bg-white rounded-full cursor-pointer z-50`}
                                onClick={async () => {
                                  await createNewUseCase
                                    .execute(
                                      carrousel.title!,
                                      userInfo?.access_token,
                                      carrousel.content,
                                      carrousel.image,
                                      carrousel?.id,
                                      !carrousel.attached,
                                      true
                                    )
                                    .then(async () => {
                                      await initNews();
                                    });
                                }}
                              />
                            )}
                            {userInfo && userInfo.user.rol.id === 1 && (
                              <MdUploadFile
                                size={20}
                                title="Editar"
                                className="text-neutral-500 bg-white rounded-full cursor-pointer z-50"
                                onClick={() => handleOpenAddFile(carrousel.id)}
                              />
                            )}
                          </div>
                          <Link href={`/noticia?id=${carrousel.id}`} passHref>
                            <img
                              id="noticia"
                              className="h-3/4 rounded-t-br20 w-full object-cover"
                              src={carrousel.image}
                              alt={carrousel.title}
                            />
                          </Link>

                          <p className="text-neutral-600 text-center py-2 text-xs">
                            {carrousel.title}
                          </p>
                        </div>
                      );
                    })}
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
          <footer>
            <Footer />
          </footer>
          <Dialog
            open={openAddNews}
            onClose={handleClsAddNews}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{tilte}</DialogTitle>
            <DialogContent>
              {loading ? (
                // Mostrar el indicador de carga mientras se está creando una noticia
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
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

                    {error && <p className="error pt-2">{error}</p>}
                  </form>
                </DialogContentText>
              )}
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
              {"Eliminar Noticia"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Está seguro que desea eliminar esta noticia?
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

          <Dialog
            open={openAddRds.open}
            onClose={handleCloseRds}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {openAddRds.isModify ? "Editar red" : "Añadir nueva red"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={formikForm.handleSubmit}
                >
                  <div className="flex flex-col">
                    <label htmlFor="altImg">Ingresa el alt:</label>
                    <input
                      type="text"
                      id="altImg"
                      placeholder="alt"
                      className="input input-bordered w-full max-w-xs bg-transparent mt-2"
                      value={formikForm.values.name}
                      onChange={(
                        titleChange: ChangeEvent<HTMLInputElement>
                      ) => {
                        formikForm.setFieldValue(
                          "name",
                          titleChange.target.value,
                          true
                        );
                      }}
                    />
                    {formikForm.errors.name && (
                      <p className="text-red-500 text-xs italic">
                        {formikForm.errors.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="urlImg">Ingresa el url de la imagen:</label>
                    <input
                      type="text"
                      id="urlImg"
                      placeholder="url"
                      className="input input-bordered w-full max-w-xs bg-transparent mt-2"
                      value={formikForm.values.image}
                      onChange={(
                        titleChange: ChangeEvent<HTMLInputElement>
                      ) => {
                        formikForm.setFieldValue(
                          "image",
                          titleChange.target.value,
                          true
                        );
                      }}
                    />
                    {formikForm.errors.image && (
                      <p className="text-red-500 text-xs italic">
                        {formikForm.errors.image}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="linkImg">Ingresa el link de la red:</label>
                    <input
                      type="text"
                      id="linkImg"
                      placeholder="link"
                      className="input input-bordered w-full max-w-xs bg-transparent mt-2"
                      value={formikForm.values.url}
                      onChange={(
                        titleChange: ChangeEvent<HTMLInputElement>
                      ) => {
                        formikForm.setFieldValue(
                          "url",
                          titleChange.target.value,
                          true
                        );
                      }}
                    />
                    {formikForm.errors.url && (
                      <p className="text-red-500 text-xs italic">
                        {formikForm.errors.url}
                      </p>
                    )}
                  </div>
                </form>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <div className="flex flex-row w-full justify-center gap-3 pb-5">
                <Button
                  onClick={() => {
                    formikForm.setFieldValue("isEnabled", false, true);
                    if (openAddRds.isModify) {
                      formikForm.submitForm();
                    } else {
                      handleCloseRds();
                    }
                  }}
                  variant="outlined"
                  color="error"
                >
                  {openAddRds.isModify ? "Borrar" : "Cancelar"}
                </Button>
                <Button
                  onClick={formikForm.submitForm}
                  variant="outlined"
                  color="success"
                >
                  Aceptar
                </Button>
              </div>
            </DialogActions>
          </Dialog>

          <Dialog
            open={addFile}
            onClose={handleClsAddFile}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{tilte}</DialogTitle>
            <DialogContent>
              {loading ? (
                // Mostrar el indicador de carga mientras se está creando una noticia
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <DialogContentText id="alert-dialog-description">
                  <form>
                    <CustomInput
                      className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br20"
                      value={pdfFormValues.pdfName}
                      onChange={handlePdfInputChange}
                      name="pdfName"
                      label="Titutlo del PDF"
                    />
                    <br />

                    <CustomTextArea
                      className="bg-transparent h-40 p-4 w-full pl-4 border border-l-base-300 rounded-br20"
                      value={pdfFormValues.pdfDescription}
                      onChange={handlePdfTxtAreaChange}
                      name="pdfDescription"
                      label="Descripción PDF"
                    />
                    <br />
                    <CustomPdfInput returnFile={handlePdfChange} />

                    {error && <p className="error pt-2">{error}</p>}
                  </form>
                </DialogContentText>
              )}
            </DialogContent>
            <DialogActions className="justify-center pb-6">
              <Button
                onClick={handlePdfSubmit}
                variant="outlined"
                color="success"
              >
                Aceptar
              </Button>
              <Button
                onClick={handleClsAddFile}
                variant="outlined"
                color="error"
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
