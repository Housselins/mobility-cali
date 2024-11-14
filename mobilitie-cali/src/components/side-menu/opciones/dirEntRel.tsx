import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./DirEntRel.css";
import { Footer } from "@/components/footer/Footer";
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { url } from "inspector";


export default function DirEntRel() {

    const [entidades, setEntidades] = useState<any[]>([]);
    const [type, setType] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [selectedEntidad, setSelectedEntidad] = useState<any>(null);
    const [showOptions, setShowOptions] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState
        ({
            nombre: "",
            url: "",
        });


    const initEntidades = async () => {
        try {
            const response = await axios.get("http://localhost:4000/entidades");
            console.log("Response entidades:", response.data);

            setEntidades(response.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    }

    const handleEdit = async (id: number) => {
        setType("edit");
        setShowEdit(!showEdit);
        setShowOptions(false);
        setSelectedEntidad(id);
        const response = await axios.get(`http://localhost:4000/entidades/${id}`);
        setFormValues(response?.data);
    }

    const handleAdd = () => {
        setType("add");
        setShowAdd(!showAdd);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleCancelar = () => {
        setShowAdd(false);
        setShowEdit(false);
        setShowOptions(true);
        setFormValues({
            nombre: "",
            url: "",
        })
    }

    const handleSubmit = async () => {
        console.log('formValues', formValues);
        
        if (!formValues.nombre || !formValues.url) {
            return toast.error("Todos los campos son obligatorios");
        }
        try {
            if (type === "edit") {
                await axios.put(`http://localhost:4000/entidades/${selectedEntidad}`, formValues);
                setShowEdit(!showEdit);
                setShowOptions(true);
                toast.success("Información editada exitosamente");
            } else {
                await axios.post("http://localhost:4000/entidades", formValues);
                setShowAdd(!showAdd);
                setShowOptions(true);
                toast.success("Información creada exitosamente");
                setFormValues({
                    nombre: "",
                    url: "",
                })
            }
            initEntidades();
        } catch (error) {
            console.error("Error al guardar los datos:", error);
        }
    }

    const [openDelete, setOpenDelete] = useState(false);

    const handleDelete = async (id: number) => {
        setOpenDelete(true);
        setSelectedEntidad(id);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleDeleteinfo = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/entidades/${selectedEntidad}`);
            initEntidades();
            setOpenDelete(false);
            toast.success("Entidad eliminada exitosamente!");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        handleCloseDelete();
    }
    useEffect(() => {
        initEntidades();
    }, []);

    return (
        <>
            <div className="container-dirEntRel">
                <div className="infoPrincipal-dirEntRel">
                    <p className="title-dirEntRel">Directorio de entidades relacionadas</p>
                    <div className="pgel-dirEntRel">
                        <p className="span-dirEntRel">A continuación se lista algunas entidades que por su razon social y mision estan altamente relacionadas con nosotros</p>
                    </div>
                    <div className="listado-dirEntRel">
                        {entidades.map((entidad, index) => (
                            <div className="flex" key={index}>
                                {selectedEntidad === entidad.id && showEdit && type === "edit" ? (
                                    <div className="flex">
                                        <input
                                            type="text"
                                            className="bg-transparent h-10 pl-4 border rounded-br10 mb-4 mr-4"
                                            value={formValues.nombre}
                                            onChange={handleInputChange}
                                            name="nombre"
                                        />
                                        <input
                                            type="text"
                                            className="bg-transparent h-10 pl-4 border rounded-br10 mb-4"
                                            value={formValues.url}
                                            onChange={handleInputChange}
                                            name="url"
                                        />
                                        <FaCheck title="Guardar entidad" style={{ color: "green", margin: "10px", cursor: "pointer" }} onClick={() => handleSubmit()} />
                                        <FaTimes title="Cancelar" style={{ color: "red", margin: "10px", cursor: "pointer" }} onClick={() => handleCancelar()} />
                                    </div>
                                ) : (
                                    <Link href={entidad.url} target="_blank" rel="noopener noreferrer">
                                        <p className="mr-4">{index + 1}. {entidad.nombre}</p>
                                    </Link>                       
                                )}


                                <div>
                                    <button className="mb-2">
                                        <FaEdit
                                            title="Editar entidad"
                                            className="edit-dirEntRel mr-4"
                                            onClick={() => handleEdit(entidad.id)}
                                        /></button>
                                    <button className="mb-2" disabled={selectedEntidad === entidad.id && showEdit}>
                                        <FaTrash title="Eliminar entidad" className="delete-dirEntRel" onClick={() => handleDelete(entidad.id)} /></button>
                                </div>


                            </div>
                        ))}
                        {/*Para agregar una nueva entidad*/}
                        <div className="">
                            {showAdd && type === "add" && (
                                <div className="flex">
                                    <input
                                        type="text"
                                        className="bg-transparent h-10 pl-4 border rounded-br10 mb-4 mr-4"
                                        placeholder="Nombre de la entidad"
                                        value={formValues.nombre}
                                        onChange={handleInputChange}
                                        name="nombre"
                                    />
                                    <input
                                        type="text"
                                        className="bg-transparent h-10 pl-4 border rounded-br10 mb-4"
                                        placeholder="URL de la entidad"
                                        value={formValues.url}
                                        onChange={handleInputChange}
                                        name="url"
                                    />
                                    <FaCheck title="Guardar entidad" style={{ color: "green", margin: "10px", cursor: "pointer" }} onClick={() => handleSubmit()} />
                                    <FaTimes title="Cancelar" style={{ color: "red", margin: "10px", cursor: "pointer" }} onClick={() => handleCancelar()} />
                                </div>
                            )}
                            <div className="flex">
                                <FaPlus title="Añadir entidad" className="plus-dirEntRel" onClick={() => handleAdd()} />
                                <p className="new-dirEntRel">Nueva entidad</p>
                            </div>
                        </div>
                    </div>
                </div>

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
                            ¿Está seguro de eliminar esta Entidad?
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
