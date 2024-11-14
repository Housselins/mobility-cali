"use client";

import { Footer } from "@/components/footer/Footer";
import { Topbar } from "@/components/topbar/Topbar";
import { MdDelete, MdModeEdit, MdOutlineAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import './HorariosAtencion.css';
import axios from "axios";
import { id } from "inversify";
import { CustomInput } from "@/presentation";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import toast from "react-hot-toast";
export default function HorariosDeAtencion() {

  const [userInfo, setUserInfo] = useState<any>(null);

  const [inForg, setInForg] = useState([{
    nombre: "",
    horario: "",
    sedes: [{
      nombre: "",
      direccion: ""
    }]
  }]);

  const [idHorario, setIdHorario] = useState("");

  const [formValues, setFormValues] = useState({
    direccion: "",
    titulo: "",
    tipo: "",
    horario: "",
    pertenece: ""
  });
  const [openAdd, setOpenAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const handleEditar = async (id: string) => {
    const response = await axios.get(`http://localhost:4000/horariosdirecciones/${id}`);
    setIdHorario(id);
    setFormValues(response.data);
    setOpenAdd(true);
    setType("edit");
    setTitle("Editar Informacion");
  };

  const handleClickOpenDelete = (id: string) => {
    setIdHorario(id);
    setOpenDelete(true);
    setTitle("Eliminar Horario de Atencion");
  }
  const handleClickOpen = (content: any) => {
    console.log(`content`, content);

    setOpenAdd(true);
    setType("add");
    setTitle("Añadir Horario de Atencion");
    setFormValues({
      direccion: "",
      titulo: "",
      tipo: content.tipo,
      horario: content.horario,
      pertenece: content.nombre
    })
  };

  const handleSubmit = async () => {
    if (!formValues.direccion || !formValues.titulo) {
      alert("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      if (type === "edit") {
        await axios.put(`http://localhost:4000/horariosdirecciones/${idHorario}`, formValues);
        toast.success("Horario actualizado exitosamente");
      } else if (type === "add") {
        await axios.post("http://localhost:4000/horariosdirecciones", formValues);
        toast.success("Horario creado exitosamente");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
      getHorarios();
    }
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setIdHorario("");
  }

  const handleClose = () => {
    setOpenAdd(false);
    setFormValues({
      direccion: "",
      titulo: "",
      tipo: "",
      horario: "",
      pertenece: ""
    })
  };

  const getHorarios = async () => {
    try {
      const response = await axios.get("http://localhost:4000/horariosdirecciones");
      console.log("Response horarios:", response.data);
      const rawData = response.data;
      const organizedData: any = [];
      rawData.forEach((item: any) => {
        // Buscar si ya existe un elemento con el mismo `pertenece`
        let existing = organizedData.find((org: any) => org.nombre === item.pertenece);

        if (!existing) {
          // Si no existe, crear un nuevo elemento
          existing = {
            nombre: item.pertenece,
            horario: item.horario,
            tipo: item.tipo,
            sedes: []
          };
          organizedData.push(existing);
        }

        // Agregar la sede al arreglo de `sedes` dentro de `existing`
        existing.sedes.push({
          id: item.id,
          nombre: item.titulo,
          direccion: item.direccion
        });
      });

      // Asignar los datos organizados a `inForg`
      setInForg(organizedData);

      console.log("Organized data:", organizedData);
    } catch (error) {
      console.error("Error al obtener los horarios:", error);
      //setHorarios([]); 
    }
  };

  const handleDeleteinfo = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/horariosdirecciones/${idHorario}`);
      getHorarios();
      setOpenDelete(false);
      toast.success("Horario eliminado exitosamente");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    handleCloseDelete();
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");

    getHorarios();

    if (userData) {
      setUserInfo(JSON.parse(userData));
      console.log("userInfo", userInfo);
    }
  }, []);


  return (
    <>
      <div className="w-screen h-4/5 pross">
        <Topbar />

        <div className="pt-14 container-horarios">
          <div className="pl-6 pt-14">

            <b className="text-5xl text-principal title-localizacion">Localización física y horarios de atención</b>

            <br />

            {inForg.map((content: any) => (
              <>
                <div className="mt-4 px-6 info-horarios">
                  <p><strong className="text-principalTransparente">{content.nombre}</strong></p>
                  {content.sedes.map((sede: any) => (
                    <div className="pl-7">
                      <b className="text-neutral-950 mt-4"> * {sede.nombre}</b>
                      <div className="flex flex-row gap-4">
                        <p className="text-neutral-800 mb-2">{sede.direccion}</p>
                        {userInfo?.access_token && (
                          <>
                            <MdModeEdit size={15} title="Editar información"
                              className="h-5 cursor-pointer"
                              onClick={() => { handleEditar(sede.id) }}

                            />


                            <MdDelete size={15} title="Eliminar información"
                              className="h-5 cursor-pointer"
                              onClick={() => handleClickOpenDelete(sede.id)}

                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {userInfo?.access_token && (
                    <div className="w-full flex items-center mb-4">
                      <MdOutlineAdd size={15} title="Agregar información"
                        className="h-5 cursor-pointer"
                        onClick={() => handleClickOpen(content)}

                      />
                    </div>
                  )}
                  <p>{content.horario}</p>
                </div>
                <br />
              </>
            ))}

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
                    value={formValues.direccion}
                    onChange={handleInputChange}
                    name="direccion"
                    label="Direccion"
                  />
                  <CustomInput
                    className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                    value={formValues.titulo}
                    onChange={handleInputChange}
                    name="titulo"
                    label="Nombre"
                  />
                  <div style={{ display: "none" }}>
                    <CustomInput
                      className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                      value={formValues.tipo}
                      onChange={handleInputChange}
                      name="tipo"
                      label="tipo"
                    />
                    <CustomInput
                      className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                      value={formValues.horario}
                      onChange={handleInputChange}
                      name="horario"
                      label="horario"
                    />
                    <CustomInput
                      className="bg-transparent h-10 w-full pl-4 border border-l-base-300 rounded-br10"
                      value={formValues.pertenece}
                      onChange={handleInputChange}
                      name="pertenece"
                      label="pertenece"
                    />
                  </div>
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

        <footer>
          <Footer />
        </footer>
      </div>

    </>
  );
}
