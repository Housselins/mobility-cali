
'use client';
import { Topbar } from '@/components/topbar/Topbar'
import React, { useEffect, useState } from 'react'
import './Estudios.css'
import { Footer } from '@/components/footer/Footer'
import axios from 'axios'
import { useRouter } from "next/navigation";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CustomInput } from '@/presentation';
import toast from 'react-hot-toast';

const Estudios = () => {

    const router = useRouter();
    const [estudios, setEstudios] = useState<any[]>([]);

    const [openAddInfo, setOpenAddInfo] = useState(false);

    const [type, setType] = useState("");
    const [tilte, setTilte] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenAddInfo = () => {
        setType("add");
        setTilte("Añadir estudio o investigación");
        setOpenAddInfo(true);
    };

    const handleClsAddInfo = () => {
        setOpenAddInfo(false);
        limpiarFormValues();
        setError(null);
    };

    const limpiarFormValues = () => {
        setFormValues({
            titulo: "",
            descripcion: ""
        });
    }

    const initEstudios = async () => {
        try {
            const estudios = await axios.get('http://localhost:4000/estudios');
            setEstudios(estudios.data);
        } catch (error) {
            console.log(error);
        }
    }

    const [formValues, setFormValues] = useState
        ({
            titulo: "",
            descripcion: ""
        });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        if (!formValues.titulo || !formValues.descripcion) {
            setError("Todos los campos son obligatorios");
            return
        }
        setLoading(true);
        try {
            if (type === "edit") {
                await axios.put(`http://localhost:4000/estudios/${selectedInfoId}`, formValues);
                initEstudios();
                toast.success("Información actualizada exitosamente!");
            } else if (type === "add") {
                await axios.post("http://localhost:4000/estudios", formValues);
                await initEstudios();
                toast.success("Información creada exitosamente!");
            }
            handleClsAddInfo();
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("Error al agregar estudio");
        }
        finally {
            setLoading(false);
        }
        limpiarFormValues();
        setError(null);
        handleClsAddInfo();
    }

    const handleOpenEditInfo = async (id: string) => {
        setType("edit");
        setTilte("Editar estudio");
        const response = await axios.get(`http://localhost:4000/estudios/${id}`);
        setOpenAddInfo(true);
        setFormValues(response?.data);
        setSelectedInfoId(id);
    }

    const handleClickOpenDelete = (id: string) => {
        setSelectedInfoId(id);
        setOpenDelete(true);
    }

    const handleDeleteinfo = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/estudios/${selectedInfoId}`);
            initEstudios();
            setOpenDelete(false);
            toast.success("Estudio eliminado exitosamente!");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        handleCloseDelete();
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    useEffect(() => {
        initEstudios();
    })

    return (
        <>
            <div>
                <div className="container-estudios">
                    <Topbar />
                    <div className="infoPrincipal-estudios">
                        <h1 className="title-estudios">Estudios, investigaciones y otras publicaciones</h1>
                        <div className="pgel">
                            <p className="span-dirEntRel mb-4">
                                En esta publicación usted podrá encontrar estudios, investigaciones y otro tipo de publicaciones de interés que ha realizado la Secretaría de Movilidad.</p>
                        </div>
                        <div className="listado-estudios">
                            {estudios.map((estudio, index) => (
                                <div className='flex'>
                                    <div key={index} className="estudio" >
                                        <p className="mr-4 cursor-pointer" onClick={() => {
                                            router.push(`/infoEstudio?id=${estudio.id}`);
                                        }} > {estudio.titulo}</p>

                                    </div>

                                    <div>
                                        <button className="mb-2">
                                            <FaEdit
                                                title="Editar entidad"
                                                className="edit-estudio mr-4"
                                                onClick={() => handleOpenEditInfo(estudio.id)}
                                            /></button>
                                        <button className="mb-2">
                                            <FaTrash title="Eliminar entidad" className="delete-estudio" onClick={() => handleClickOpenDelete(estudio.id)} /></button>
                                    </div>

                                </div>
                            ))}
                            <div>
                                <FaPlus className="mr-4 icon-estudios" onClick={handleOpenAddInfo} />
                            </div>
                        </div>
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
                                            value={formValues.titulo}
                                            onChange={handleInputChange}
                                            name="titulo"
                                            label="Titulo"
                                    
                                        />

                                        <div className="pt-4">
                                            <CustomInput
                                                className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br20"
                                                value={formValues.descripcion}
                                                onChange={handleInputChange}
                                                name="descripcion"
                                                label="Descripcion"
                                     
                                            />
                                        </div>
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
                            {"Eliminar información"}
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
                <Footer />
            </div>
        </>
    )
}

export default Estudios