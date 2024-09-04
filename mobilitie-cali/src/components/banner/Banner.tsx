"use client";
import './Banner.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { FaPen, FaTrash, FaPlus } from "react-icons/fa6";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { CustomInput, CustomImageInput } from '../../presentation/components/atoms'
import axios from "axios";
// Importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importar los módulos de Swiper desde la ruta correcta
import { Navigation, Pagination } from 'swiper/modules';

export const Banner = () => {
    // Estado para manejar la visibilidad del modal
    const [openAdd, setOpenAdd] = useState(false);
    const [banners, setBanners] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);


    // Estado para manejar el ID del banner seleccionado para eliminación
    const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);

    // Estado para manejar los valores del formulario
    const [formValues, setFormValues] = useState({
        alt: "",
        image: ""
    });

    // Función para abrir el modal
    const handleClickOpen = () => {
        if (banners.length >= 6) {
            alert("No se pueden añadir más de 6 imágenes al banner.");
            return;
        }
        setOpenAdd(true);
    };

    // Función para cerrar el modal
    const handleClose = () => {
        setOpenAdd(false);
    };


    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleDeleteimage = async () => {
        if (!selectedBannerId) return; // Verificar si hay un ID seleccionado

        try {
            await axios.delete(`http://localhost:4000/banner/${selectedBannerId}`);
            setBanners(banners.filter((banner: any) => banner.id !== selectedBannerId)); // Actualizar la lista de banners
            setOpenDelete(false); // Cerrar el modal después de eliminar
        } catch (error) {
            console.error('Error al eliminar el banner:', error);
        }

    }
    // Función para manejar cambios en los inputs
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    // Función para manejar el archivo de imagen
    const handleImageChange = (image: string) => {
        setFormValues({
            ...formValues,
            image
        });
    };

    // Función para manejar la acción del botón Aceptar
    const handleSubmit = async () => {
        console.log('Valores del formulario:', formValues);
        try {
            await axios.post('http://localhost:4000/banner', formValues);
            await getBanners(); // Actualizar la lista de banners después de añadir uno nuevo
        } catch (error) {
            console.log(error);

        }
        handleClose();
        
    };

    const getBanners = async () => {
        try {
            const response = await axios.get('http://localhost:4000/banner');
            console.log('Response banners:', response.data);
            setBanners(response.data);
        } catch (error) {
            console.error('Error al obtener los banners:', error);
        }

    }

    // Función para abrir el modal de eliminación y establecer el ID del banner a eliminar
    const handleClickOpenDelete = (id: string) => {
        setSelectedBannerId(id);
        setOpenDelete(true);
    }

    useEffect(() => {
        getBanners();
    }, []);

    return (
        <>
             <div className="Banner-header">
                {/* Contenedor de icono de añadir siempre visible */}
                <div className="add-icon-container">
                    <FaPlus title='Añadir nueva imagen' className="plus" onClick={handleClickOpen} />
                </div>

                {/* Renderizar los banners obtenidos en un carrusel */}
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                >
                    {banners.map((banner: any, index) => (
                        <SwiperSlide key={index}>
                            <div className="image-container">
                                <img className="image-banner" src={banner.image} alt={banner.alt} />
                                <FaTrash title='Eliminar' className='trash' onClick={() => handleClickOpenDelete(banner.id)} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Modal */}
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
                    <DialogContentText id="alert-dialog-description">
                        <form>
                            <CustomInput
                                value={formValues.alt}
                                onChange={handleInputChange}
                                name="alt"
                                label="Descripción imagen"
                            />
                            <CustomImageInput
                                returnFile={handleImageChange}
                            />
                        </form>
                    </DialogContentText>
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
                    <Button onClick={handleCloseDelete} variant="outlined" color="success">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
