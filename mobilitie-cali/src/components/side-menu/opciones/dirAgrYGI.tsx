import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CustomInput } from '@/presentation';
import axios from 'axios';
import { set } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function DirAgrYGI() {

    const [agremiaciones, setAgremiaciones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [openAddInfo, setOpenAddInfo] = useState(false);

    const [type, setType] = useState("");
    const [tilte, setTilte] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
    const [openDelete, setOpenDelete] = useState(false);

    const initAgremiaciones = async () => {
        try {
            const response = await axios.get("http://localhost:4000/agremiaciones");
            setAgremiaciones(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener la información:", error);
        }
    };

    const [formValues, setFormValues] = useState
        ({
            nombre: "",
            telefono: "",
            direccion: "",
            correo: ""
        });

    const limpiarFormValues = () => {
        setFormValues({
            nombre: "",
            telefono: "",
            direccion: "",
            correo: ""
        });
    };

    const handleOpenAddInfo = () => {
        setType("add");
        setTilte("Añadir agremiación");
        setOpenAddInfo(true);
    };

    const handleClsAddInfo = () => {
        setOpenAddInfo(false);
        limpiarFormValues();
        setError(null);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        if (formValues.nombre === "" || formValues.telefono === "" || formValues.direccion === "" || formValues.correo === "") {
            setError("Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            if (type === "edit") {
                await axios.put(`http://localhost:4000/agremiaciones/${selectedInfoId}`, formValues);
                initAgremiaciones();
                toast.success("Agremiación actualizada exitosamente!");
            } else if (type === "add") {
                await axios.post("http://localhost:4000/agremiaciones", formValues);
                await initAgremiaciones();
                toast.success("Agremiación creada exitosamente!");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        limpiarFormValues();
        handleClsAddInfo();
        setError(null);
    }

    const handleCloseDelete = () => {
        setSelectedInfoId(null);
        setOpenDelete(false);
    }

    const handleClickOpenDelete = (id: string) => {
        setSelectedInfoId(id);
        setOpenDelete(true);
    }

    const handleDeleteinfo = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/agremiaciones/${selectedInfoId}`);
            initAgremiaciones();
            setOpenDelete(false);
            toast.success("Agremiación eliminada exitosamente!");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        handleCloseDelete();
    }

    const handleOpenEditInfo = async (id: string) => {
        setType("edit");
        setTilte("Editar agremiación");
        const response = await axios.get(`http://localhost:4000/agremiaciones/${id}`);
        setFormValues(response.data);
        setSelectedInfoId(id);
        setOpenAddInfo(true);
    }

    React.useEffect(() => {
        initAgremiaciones();
    })

    return (

        <div className="w-full h-full overflow-x-auto overflow-y-auto">
            <table className="table">

                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Dirección</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {agremiaciones.map((agremiacion: any, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{agremiacion.nombre}</td>
                            <td>{agremiacion.telefono}</td>
                            <td>{agremiacion.direccion}</td>
                            <td>{agremiacion.correo}</td>
                            <td className=" flex gap-2">
                                <FaEdit onClick={() => handleOpenEditInfo(agremiacion.id)} style={{ color: "black" }} className="text-2xl cursor-pointer" />
                                <FaTrash onClick={() => handleClickOpenDelete(agremiacion.id)} style={{ color: "red" }} className="text-2xl cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                    <div className='flex justify-center m-4'>
                        <FaPlus onClick={handleOpenAddInfo} style={{ color: "green" }} className="text-2xl cursor-pointer" />
                    </div>

                </tbody>
            </table>

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
                                    value={formValues.nombre}
                                    onChange={handleInputChange}
                                    name="nombre"
                                    label="Nombre de la agremiación"

                                />

                                <div className="pt-4">
                                    <CustomInput
                                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br20"
                                        value={formValues.telefono}
                                        onChange={handleInputChange}
                                        name="telefono"
                                        label="Telefono de la agremiación"

                                    />
                                </div>

                                <div className="pt-4">
                                    <CustomInput
                                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br20"
                                        value={formValues.direccion}
                                        onChange={handleInputChange}
                                        name="direccion"
                                        label="Dirección"

                                    />
                                </div>

                                <div className="pt-4">
                                    <CustomInput
                                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br20"
                                        value={formValues.correo}
                                        onChange={handleInputChange}
                                        name="correo"
                                        label="Correo"

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
    )
}