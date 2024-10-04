"use client";
import "./Banner.css";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa6";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import {
    CustomInput,
    CustomImageInput,
} from "../../presentation/components/atoms";
import axios from "axios";
// Importaciones de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importar los módulos de Swiper desde la ruta correcta
import { Navigation, Pagination } from "swiper/modules";

export const Banner = () => {


    // Estado para manejar la visibilidad del modal
    const [openAdd, setOpenAdd] = useState(false);
    const [banners, setBanners] = useState<any[]>([]);
    const [openDelete, setOpenDelete] = useState(false);

    // Estado para manejar el ID del banner seleccionado para eliminación
    const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);
    const [userInfo, setUserInfo] = React.useState<any>(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Estado para la carga

    useEffect(() => {
        const userData = localStorage.getItem("user");
        console.log("userData", userData);

        if (userData) {
            setUserInfo(JSON.parse(userData));
            console.log("userInfo", userInfo);

        }
    }, []);

    // Estado para manejar los valores del formulario
    const [formValues, setFormValues] = useState({
        alt: "",
        image: "",
    });

    // Función para abrir el modal
    const handleClickOpen = () => {
        console.log('userInfo', userInfo);

        if (banners.length >= 6) {
            alert("No se pueden añadir más de 6 imágenes al banner.");
            return;
        }
        setOpenAdd(true);
    };

    // Función para cerrar el modal
    const handleClose = () => {
        setFormValues({ alt: "", image: "" });
        setError(null);
        setOpenAdd(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDeleteimage = async () => {
        if (!selectedBannerId) return; // Verificar si hay un ID seleccionado

        try {
            await axios.delete(`http://localhost:4000/banner/${selectedBannerId}`);
            setBanners(
                banners.filter((banner: any) => banner.id !== selectedBannerId)
            ); // Actualizar la lista de banners
            setOpenDelete(false); // Cerrar el modal después de eliminar
        } catch (error) {
            console.error("Error al eliminar el banner:", error);
        }
    };
    // Función para manejar cambios en los inputs
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Función para manejar el archivo de imagen
    const handleImageChange = (image: string) => {
        setFormValues({
            ...formValues,
            image,
        });
    };

    // Función para manejar la acción del botón Aceptar
    const handleSubmit = async () => {
        if (!formValues.alt || !formValues.image) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);  // Iniciar carga
        try {
            await axios.post("http://localhost:4000/banner", formValues);
            await getBanners();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);  // Finalizar carga
        }
        handleClose();
        setFormValues({
            alt: "",
            image: "",
        });
    };

    const getBanners = async () => {
        try {
            const response = await axios.get("http://localhost:4000/banner");
            console.log("Response banners:", response.data);
            setBanners(Array.isArray(response.data) ? response.data : []); // Asegurarse de que sea un array
        } catch (error) {
            console.error("Error al obtener los banners:", error);
            setBanners([]); // Si hay un error, asegurarse de que banners sea un array vacío
        }
    };

    // Función para abrir el modal de eliminación y establecer el ID del banner a eliminar
    const handleClickOpenDelete = (id: string) => {
        setSelectedBannerId(id);
        setOpenDelete(true);
    };
    const [currentSlide, setCurrentSlide] = useState(0);

    // Cambiar slide cada 3 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 3000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [banners.length]);

    useEffect(() => {
        getBanners();
    }, []);

    return (
        <>
            <Dialog
                open={openAdd}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Añadir nueva imagen al banner"}
                </DialogTitle>
                <DialogContent>
                    {loading ? (
                        // Mostrar el indicador de carga mientras se está creando una noticia
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <DialogContentText id="alert-dialog-description">
                            <form>
                                <CustomInput
                                    className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                                    value={formValues.alt}
                                    onChange={handleInputChange}
                                    name="alt"
                                    label="Descripción imagen"
                                />
                                <CustomImageInput
                                    className="pt-4"
                                    returnFile={handleImageChange} />
                                {error && <p className="error pt-2">{error}</p>}
                            </form>
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} variant="outlined" color="success">
                        Aceptar
                    </Button>
                    <Button onClick={handleClose} variant="outlined" color="error">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
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
                    <Button onClick={handleDeleteimage} variant="outlined" color="error">
                        Aceptar
                    </Button>
                    <Button
                        onClick={handleCloseDelete}
                        variant="outlined"
                        color="success"
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="w-full relative">
                {userInfo && userInfo.user.rol.id === 1 && (
                    <div className="add-icon-container">


                        <FaPlus
                            title="Añadir nueva imagen"
                            className="plus"
                            onClick={handleClickOpen}
                        />
                    </div>
                )}
                <div className="w-full carousel">
                    {banners.map((banner: any, index) => (
                        <div
                            key={index}
                            id={"slide" + index}
                            className={`carousel-item relative w-full h-2/4 ${currentSlide === index ? "block" : "hidden"
                                }`}
                        >
                            {userInfo && userInfo.user.rol.id === 1 && (
                                <FaTrash
                                    title="Eliminar"
                                    className="trash"
                                    onClick={() => handleClickOpenDelete(banner.id)}
                                />
                            )}

                            <img src={banner.image} alt={banner.alt} className="w-full" />
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <button
                                    onClick={() =>
                                        setCurrentSlide(currentSlide === 0 ? banners.length - 1 : currentSlide - 1)
                                    }
                                    className="btn btn-circle"
                                >
                                    ❮
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentSlide(currentSlide === banners.length - 1 ? 0 : currentSlide + 1)
                                    }
                                    className="btn btn-circle"
                                >
                                    ❯
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
