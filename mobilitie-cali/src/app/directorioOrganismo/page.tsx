"use client";

import { Footer } from "@/components/footer/Footer";
import { Topbar } from "@/components/topbar/Topbar";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import './DirectorioFuncionario.css';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { CustomImageInput, CustomInput } from "@/presentation";
import axios from "axios";
import toast from "react-hot-toast";
export default function DirectorioOrganismo() {

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState<string | null>(null);


  const [formValues, setFormValues] = useState({
    direccion: "",
    correo: "",
    cargo: "",
    telefono: "",
    nombre: "",
    image: "",
    link: "",
  });

  const handleClickOpen = () => {
    setOpenAdd(true);
    setType("add");
    setTitle("Añadir Funcionario");
  };


  const handleOpenEditFuncionario = async (id: string) => {
    setOpenAdd(true);
    setType("edit");
    setTitle("Editar Informacion del funcionario");
    const response = await axios.get(`http://localhost:4000/funcionario/${id}`);
    setSelectedFuncionarioId(id);
    setFormValues(response.data);
  };

  const handleClickOpenDelete = (id: string) => {
    setSelectedFuncionarioId(id);
    setOpenDelete(true);
    setTitle("Eliminar Funcionario");
  };

  const handleClose = () => {
    setFormValues({
      direccion: "",
      correo: "",
      cargo: "",
      telefono: "",
      nombre: "",
      image: "",
      link: "",
    });
    setError(null);
    setOpenAdd(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const handleImageChange = (image: string) => {
    setFormValues({ ...formValues, image });
  };

  const handleSubmit = async () => {
    console.log('formValues', formValues);

    if (!formValues.direccion || !formValues.correo || !formValues.cargo || !formValues.telefono || !formValues.nombre || !formValues.link) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      if (type === "edit") {
        await axios.put(`http://localhost:4000/funcionario/${selectedFuncionarioId}`, formValues);
        initDirectorio();
        toast.success("Información actualizada exitosamente");
      } else if (type === "add") {
        console.log('agregar');

        await axios.post("http://localhost:4000/funcionario", formValues);
        await initDirectorio();
        toast.success("Funcionario creado exitosamente");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    handleClose();
    setFormValues({
      direccion: "",
      correo: "",
      cargo: "",
      telefono: "",
      nombre: "",
      image: "",
      link: "",
    })
  }

  const handleDeleteinfo = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/funcionario/${selectedFuncionarioId}`);
      initDirectorio();
      setOpenDelete(false);
      toast.success("Funcionario eliminado exitosamente");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    handleCloseDelete();
  }

  const handleCloseDelete = () => {
    setSelectedFuncionarioId(null);
    setOpenDelete(false);
  }
  useEffect(() => {
    initDirectorio();
  }, []);

  const initDirectorio = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/funcionario");
      setInfoDirectiorio(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [infoDirectorio, setInfoDirectiorio] = useState([]);
  return (
    <>
      <div className="h-full w-full overflow-hidden">
        <Topbar />

        <div className="pt-14 flex w-full justify-center">
          <div className="pl-6 w-full max-w-screen-lg">
            <div className="flex flex-row justify-between bg-neutral-300 w-full p-5 rounded-br-20">
              <p className="text-neutral-700 w-2/4">
                Listado de servidores públicos, empleados y contratistas del Estado registrados en el Sistema de Información y Gestión del Empleo Público - <strong>SIGEP II</strong>
              </p>
              <img className="w-32" src="https://www.cali.gov.co/directorio/21/secretaria-de-movilidad/info/tribunet/mod/Directorio/img/sigep-boton.png" alt="sigep_img" />
            </div>

            <br />
            <div className="overflow-y-scroll h-4/6">

              {infoDirectorio.map((content: any) => (
                <>
                  <div className="mt-4 p-6 bg-neutral-300 rounded-br-20 flex flex-row gap-10 w-full">
                    <img className="rounded-full" src={content.image} alt="img" />
                    <div className="bg-white w-full rounded-br-20 p-2 ">
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-neutral-800 text-2xl">{content.nombre}</p>
                        </div>
                        <div className="flex gap-4 items-center mr-4">
                          <div className="cursor-pointer">
                            <FaEdit
                              style={{ color: "#215a9a", fontSize: "20px" }}
                              title="Editar funcionario"
                              onClick={() => handleOpenEditFuncionario(content.id)}
                            />

                          </div>
                          <div className="cursor-pointer">
                            <FaTrash
                              style={{ color: "red", fontSize: "20px" }}
                              title="Eliminar funcionario"
                              onClick={() => handleClickOpenDelete(content.id)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4  ">
                        <p>Direccion: {content.direccion}</p>
                        <p>Telefono: {content.telefono}</p>
                        <p>Correo: {content.correo}</p>
                        <p>Cargo: {content.cargo}</p>
                        <p>
                          Link: <a href={content.link} target="_blank">{content.nombre}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <br />
                </>
              ))}
            </div>
            <div className="flex  justify-center w-full p-5 ">
              <div className="add-icon-container">
                <FaPlus
                  style={{ color: "white" }}
                  title="Añadir funcionario"
                  onClick={handleClickOpen}
                  className="plus" />
              </div>
            </div>
            <Dialog
              open={openAdd}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {title}
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
                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                        value={formValues.nombre}
                        onChange={handleInputChange}
                        name="nombre"
                        label="Nombre funcionario"
                      />
                      <CustomInput
                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                        value={formValues.direccion}
                        onChange={handleInputChange}
                        name="direccion"
                        label="Direccion"
                      />
                      <CustomInput
                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                        value={formValues.correo}
                        onChange={handleInputChange}
                        name="correo"
                        label="Correo"
                      />
                      <CustomInput
                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                        value={formValues.telefono}
                        onChange={handleInputChange}
                        name="telefono"
                        label="Telefono"
                      />
                      <CustomInput
                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                        value={formValues.cargo}
                        onChange={handleInputChange}
                        name="cargo"
                        label="Cargo"
                      />
                      <CustomInput
                        className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10 mb-4"
                        value={formValues.link}
                        onChange={handleInputChange}
                        name="link"
                        label="Link"
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-2">Foto</label>
                      <CustomImageInput returnFile={handleImageChange} />
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
                {title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ¿Está seguro de eliminar el funcionario?
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
        </div>
      
      </div>
      <footer>
          <Footer />
        </footer>
    </>
  );
}  