import { useEffect, useState } from "react";
import axios from "axios";
import "./CarruselEntes.css";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { CustomImageInput, CustomInput, CustomTextArea } from "@/presentation";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Link from "next/link";


export const CarruselEntes = () => {



    const [userInfo, setUserInfo] = useState<any>(null);
    const [infoEnte, setInfoEnte] = useState<any[]>([]);
    const [openAddInfo, setOpenAddInfo] = useState(false);

    const [type, setType] = useState("");
    const [tilte, setTilte] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleOpenAddInfo = () => {
        setType("add");
        setTilte("Añadir Ente");
        setOpenAddInfo(true);
    };

    const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpenDelete = (id: string) => {
        setSelectedInfoId(id);
        setOpenDelete(true);
    };

    const [formValues, setFormValues] = useState
        ({
            image: "",
            alt: "",
            url: ""
        });

    const handleSubmit = async () => {
        if (!formValues.image || !formValues.alt || !formValues.url) {
            setError("Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            if (type === "edit") {
                await axios.put(`http://localhost:4000/ente/${selectedInfoId}`, formValues);
                initEntes();
                toast.success("Información actualizada exitosamente!");
            } else if (type === "add") {
                await axios.post("http://localhost:4000/ente", formValues);
                await initEntes();
                toast.success("Información creada exitosamente!");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        limpiarFormValues();
        handleClsAddInfo();
        setError(null);
    };


    const initEntes = async () => {
        try {
            const response = await axios.get("http://localhost:4000/ente");
            setInfoEnte(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        initEntes();
        const userData = localStorage.getItem("user");
        console.log("userData", userData);

        if (userData) {
            setUserInfo(JSON.parse(userData));
            console.log("userInfo", userInfo);

        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleImageChange = (image: string) => {
        setFormValues({ ...formValues, image });
    };

    const handleOpenEditInfo = async (id: string) => {
        setType("edit");
        setTilte("Editar Ente");
        const response = await axios.get(`http://localhost:4000/ente/${id}`);
        setOpenAddInfo(true);
        setFormValues(response?.data);
        setSelectedInfoId(id);
    };

    const handleClsAddInfo = () => {
        setOpenAddInfo(false);
        limpiarFormValues();
        setError(null);
    };

    const handleDeleteinfo = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/ente/${selectedInfoId}`);
            initEntes();
            setOpenDelete(false);
            toast.success("Ente eliminado exitosamente!");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        handleCloseDelete();
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const limpiarFormValues = () => {
        setFormValues({ image: "", alt: "", url: "" });
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, infoEnte.length - itemsPerPage) : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= infoEnte.length ? 0 : prevIndex + 1));
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3; // Número de imágenes a mostrar por página
    return (
        <>
            <div className="bloqueZonaEnte">
                {userInfo && userInfo.user.rol.id === 1 && (
                    <div className="add-icon-container-info">
                        <FaPlus title="Añadir nuevo ente" className="plus" onClick={handleOpenAddInfo} />
                    </div>
                )}
                <div className="carousel w-full contenedores-informacion">
                    {infoEnte.slice(currentIndex, currentIndex + itemsPerPage).map((ente: any) => (

                        <div key={ente.id} className="carousel-item relative w-full carousel-item-ente">
                            {userInfo && userInfo.user.rol.id === 1 && (

                                <FaTrash title="Eliminar" className="trash-ente" onClick={() => handleClickOpenDelete(ente.id)} />

                            )}
                            {userInfo && userInfo.user.rol.id === 1 && (

                                <FaEdit title="Editar" className="edit-ente" onClick={() => handleOpenEditInfo(ente.id)} />

                            )}

                            <Link href={ente.url} target="_blank" passHref className="w-full h-full">
                                <img className="img-ente" src={ente.image} alt={ente.alt} />
                            </Link>
                        </div>

                    ))}
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button onClick={handlePrev} className="btn btn-circle">
                        ❮
                    </button>
                    <button onClick={handleNext} className="btn btn-circle">
                        ❯
                    </button>
                </div>

                <Dialog
                    open={openAddInfo}
                    onClose={handleClsAddInfo}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {tilte}
                    </DialogTitle>
                    <DialogContent>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <DialogContentText id="alert-dialog-description">
                                <form>
                                    <CustomInput
                                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br20"
                                        value={formValues.alt}
                                        onChange={handleInputChange}
                                        name="alt"
                                        label="Descripción imagen"
                                        maxLength={100}
                                    />

                                    <div className="pt-4">
                                        <CustomInput
                                            className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br20"
                                            value={formValues.url}
                                            onChange={handleInputChange}
                                            name="url"
                                            label="Url del ente"
                                            maxLength={100}
                                        />
                                    </div>
                                    <br />

                                    <br />
                                    <label >Imagen del Ente </label>
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
                            onClick={handleClsAddInfo}
                            variant="outlined"
                            color="error"
                        >
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
                        {"Eliminar información del menú central"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Está seguro de eliminar esta información?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteinfo} variant="outlined" color="error">
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
            </div>
        </>
    );
}