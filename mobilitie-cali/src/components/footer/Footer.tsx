"use client";
import { ChangeEvent, useEffect, useState } from "react";
import "./Footer.css";
import { MdDelete, MdModeEdit, MdOutlineAdd } from "react-icons/md";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";

export const Footer = () => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [anadirInfo, setAnadirInfo] = useState(false);
    const [controlDeleteLink, setControlDeleteLink] = useState(false);
    const [idLinkEliminar, SetIdLinkEliminar] = useState(0)
    const handleModalAnadir = () => {
        setAnadirInfo(!anadirInfo);
    };

    const handleDeleteLink = () => {
        setControlDeleteLink(!controlDeleteLink)
    }


    const [inFooter, setInFooter] = useState<any[]>([]);

    const getFooters = async () => {
        try {
            const response = await axios.get("http://localhost:4000/footer");
            console.log("Response footers:", response.data);
            setInFooter(Array.isArray(response.data) ? response.data : []); // Asegurarse de que sea un array
        } catch (error) {
            console.error("Error al obtener los banners:", error);
            setInFooter([]); // Si hay un error, asegurarse de que banners sea un array vacío
        }
    };

    const [formValues, setFormValues] = useState({
        fkIdFooter: "",
        texto: "",
        link: ""
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        console.log('formValues', formValues);

        try {
            await axios.post("http://localhost:4000/footer", formValues);
            handleModalAnadir()
            getFooters()
        } catch (error) {
            console.log(error);
        }
        clearForm()
    }

    const clearForm = () => {
        setFormValues({
            fkIdFooter: "",
            texto: "",
            link: ""
        })
    }

    const handleDeleteInFooter = async () => {
        console.log(idLinkEliminar);
        try {
            await axios.delete(`http://localhost:4000/footer/${idLinkEliminar}`);
            getFooters();
        } catch (error) {
            console.log(error);
        }
        handleDeleteLink();
    }

    useEffect(() => {
        const userData = localStorage.getItem("user");
        getFooters();

        if (userData) {
            setUserInfo(JSON.parse(userData));
            console.log("userInfo", userInfo);
        }
    }, []);

    return (
        <>
            <div className="flex flex-col items-center pt-4 w-full bg-principal">
                {userInfo?.access_token && (
                    <>
                        <MdOutlineAdd
                            title="Añadir"
                            className="h-5 text-white cursor-pointer"
                            onClick={handleModalAnadir}
                        />
                    </>
                )}

                <div className="text-center w-full relative p-4 text-white flex flex-row justify-around gap-3">

                    {inFooter.map((info: any, index: number) => (
                        <div className="flex flex-col w-1/4" id={"footerNumero" + (index + 1)}>
                            <p className="text-xl mb-5">{info.nombreColumna}</p>
                            {info.inFooters.map((cont: any, indx: number) => (
                                <div className={userInfo?.access_token ? "flex flex-row w-full justify-between relative  mb-3 py-2" : "flex flex-row w-full justify-center relative"}>
                                    {userInfo?.access_token ? (<>
                                        <a id={"infooter" + index + "" + indx} className={cont.link != "" ? " text-left hover:underline cursor-pointer " : " text-left cursor-default "} href={cont.link} target={cont.link != "" ? "_blank" : ""}>{cont.texto}</a>
                                        <MdDelete size={15} title="Eliminar link" onClick={() =>{handleDeleteLink(); SetIdLinkEliminar(cont.id)}} className="absolute top-1/3 right-0 cursor-pointer" />
                                    </>) : (
                                        <a id={"infooter" + index + "" + indx} className={cont.link != "" ? "text-center hover:underline cursor-pointer" : " text-center cursor-default "} href={cont.link} target={cont.link != "" ? "_blank" : ""}>{cont.texto}</a>
                                    )}
                                </div>
                            ))}
                        </div>)
                    )}
                </div >
            </div>
            <Dialog
                open={anadirInfo}
                onClose={handleModalAnadir}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Agregar informacion al footer"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                <select className="select select-bordered w-full max-w-xs bg-transparent"
                                    value={formValues.fkIdFooter}
                                    onChange={handleInputChange}
                                    name="fkIdFooter">
                                    <option disabled selected>Selecciona la columna</option>
                                    {inFooter.map((data: any, index: number) => (
                                        <option value={data.id}>{data.nombreColumna}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="infoText">Ingresa el texto:</label>
                                <input
                                    type="text"
                                    id="infoText"
                                    placeholder="Información"
                                    name="texto"
                                    value={formValues.texto}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs bg-transparent mt-2" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="infoLink">Ingresa el link:</label>
                                <input
                                    type="text"
                                    id="infoLink"
                                    placeholder="texto link"
                                    name="link"
                                    value={formValues.link}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs bg-transparent mt-2" />
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="w-full flex items-center justify-center">
                    <Button onClick={() => handleSubmit()} variant="outlined" color="success">
                        Aceptar
                    </Button>
                    <Button
                        onClick={handleModalAnadir}
                        variant="outlined"
                        color="error"
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={controlDeleteLink}
                onClose={handleDeleteLink}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Eliminar Link"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro que desea eliminar este link?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="w-full flex items-center justify-center">
                    <Button onClick={handleDeleteInFooter} variant="outlined" color="error">
                        Aceptar
                    </Button>
                    <Button
                        onClick={handleDeleteLink}
                        variant="outlined"
                        color="success"
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}