import { useEffect, useState } from "react";
import axios from "axios";
import "./MenuCentral.css";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { CustomImageInput, CustomInput, CustomTextArea } from "@/presentation";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";


export const MenuCentral = () => {
    const [infoCentral, setInfoCentral] = useState<any[]>([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAddInfo, setOpenAddInfo] = useState(false);
    const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
    const [type, setType] = useState("");
    const [tilte, setTilte] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState({ title: "", contenido_info: "", image: "" });
    const [currentIndex, setCurrentIndex] = useState(0);

    const itemsPerPage = 4; // Número de imágenes a mostrar por página

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleTxtAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleImageChange = (image: string) => {
        setFormValues({ ...formValues, image });
    };

    const initInfoCentral = async () => {
        try {
            const response = await axios.get("http://localhost:4000/info");
            setInfoCentral(response.data);
        } catch (error) {
   
        }
    };


    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        initInfoCentral();
        const userData = localStorage.getItem("user");
        console.log("userData", userData);

        if (userData) {
            setUserInfo(JSON.parse(userData));
            console.log("userInfo", userInfo);

        }
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, infoCentral.length - itemsPerPage) : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= infoCentral.length ? 0 : prevIndex + 1));
    };

    const handleClsAddInfo = () => {
        setOpenAddInfo(false);
        limpiarFormValues();
        setError(null);
    };

    const handleOpenAddInfo = () => {
        setType("add");
        setTilte("Añadir información");
        setOpenAddInfo(true);
    };

    const handleSubmit = async () => {
        if (!formValues.title || !formValues.image || !formValues.contenido_info) {
            setError("Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            if (type === "edit") {
                await axios.put(`http://localhost:4000/info/${selectedInfoId}`, formValues);
                initInfoCentral();
                toast.success("Información actualizada exitosamente!");
            } else if (type === "add") {
                await axios.post("http://localhost:4000/info", formValues);
                await initInfoCentral();
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

    const handleClickOpenDelete = (id: string) => {
        setSelectedInfoId(id);
        setOpenDelete(true);
    };

    const handleOpenEditInfo = async (id: string) => {
        setType("edit");
        setTilte("Editar información");
        const response = await axios.get(`http://localhost:4000/info/${id}`);
        setOpenAddInfo(true);
        setFormValues(response?.data);
        setSelectedInfoId(id);
    };

    const handleDeleteinfo = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/info/${selectedInfoId}`);
            initInfoCentral();
            setOpenDelete(false);
            toast.success("Información eliminada exitosamente!");
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
        setFormValues({ title: "", contenido_info: "", image: "" });
    };

    return (
        <>
            <div className="bloqueZona2">
                <span style={{ display: "none" }}>Información</span>
         
                    <div className="add-icon-container-info">
                        <FaPlus title="Añadir nueva información" className="plus" onClick={handleOpenAddInfo} />
                    </div>
          
                <div className="carousel w-full cotenedores-informacion">
                    {infoCentral.slice(currentIndex, currentIndex + itemsPerPage).map((info: any) => (
                        <div key={info.id} className="carousel-item relative w-full carousel-item-info">
                            {userInfo && userInfo.user.rol.id === 1 && (
                                <FaTrash title="Eliminar" className="trash" onClick={() => handleClickOpenDelete(info.id)} />
                            )}
                            {userInfo && userInfo.user.rol.id === 1 && (
                                <FaEdit title="Editar" className="edit" onClick={() => handleOpenEditInfo(info.id)} />
                            )}

                            <img src={info.image} alt="" />

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
                                        value={formValues.title}
                                        onChange={handleInputChange}
                                        name="title"
                                        label="Titutlo de la información"
                                        maxLength={100}
                                    />

                                    <br />

                                    <CustomTextArea
                                        className="bg-transparent h-40 p-4 w-full pl-4 border border-l-base-300 rounded-br20"
                                        value={formValues.contenido_info}
                                        onChange={handleTxtAreaChange}
                                        name="contenido_info"
                                        label="Contenido de la información"
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
};
