"use client";
import { Topbar } from '@/components/topbar/Topbar';
import React, { ChangeEvent, useState } from 'react'
import './Corrupcion.css'
import { toast, Toaster } from "react-hot-toast";

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


import { FaFileAlt, FaArrowRight } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa6';
import axios from 'axios';
const Corrupcion = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [formValues, setFormValues] = useState({
        denunciante: {
            nombreDenunciante: '',
            apellidoDenunciante: '',
            numeroIdentificacion: '',
            sexo: '',
            correo: '',
            telefono: '',
            direccion: '',
        },
        denuncia: {
            nombresApellidos: '',
            camposRol: '',
            organismo: '',
            lugarHechos: '',
            fechaHechos: '',
            descripcion: ''
        },
        pruebas: {
            evidencia: '',
            testigo1: {
                nombre: '',
                direccion: '',
                telefono: '',
                correo: ''
            },
            testigo2: {
                nombre: '',
                direccion: '',
                telefono: '',
                correo: ''
            }
        }
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        const path = name.split('.'); // Dividir el nombre por puntos (.)

        if (path.length === 2) {
            // Si el campo pertenece a 'denunciante' o 'denuncia'
            setFormValues(prevState => ({
                ...prevState,
                [path[0]]: {
                    ...prevState[path[0]],
                    [path[1]]: value
                }
            }));
        } else if (path.length === 3 && path[0] === 'pruebas') {
            // Si el campo pertenece a 'pruebas' con testigos
            setFormValues(prevState => ({
                ...prevState,
                pruebas: {
                    ...prevState.pruebas,
                    [path[1]]: {
                        ...prevState.pruebas[path[1]],
                        [path[2]]: value
                    }
                }
            }));
        }
    };

    const [errors, setErrors] = useState({
        denunciante: '',
        denuncia: ''
    });


    const handleSubmit = async () => {
        const { denunciante, denuncia } = formValues;

        if (!denunciante.nombreDenunciante || !denunciante.apellidoDenunciante || !denunciante.numeroIdentificacion ||
            !denuncia.nombresApellidos || !denuncia.camposRol || !denuncia.organismo) {

            setErrors({
                denunciante: 'Todos los campos del denunciante son obligatorios.',
                denuncia: 'Todos los campos de la denuncia son obligatorios.'
            });
            return; // No envíes el formulario si faltan campos requeridos
        }
        try {
            const response = await axios.post('http://localhost:4000/denuncia', formValues);
            toast.success("Denuncia enviada");
        } catch (error) {
            console.log(error);
            toast.error("Error al enviar la denuncia");
        }
        clearAll();

    }


    const clearAll = () => {
        setErrors({
            denunciante: '',
            denuncia: ''
        });
        setFormValues({
            denunciante: {
                nombreDenunciante: '',
                apellidoDenunciante: '',
                numeroIdentificacion: '',
                sexo: '',
                correo: '',
                telefono: '',
                direccion: '',
            },
            denuncia: {
                nombresApellidos: '',
                camposRol: '',
                organismo: '',
                lugarHechos: '',
                fechaHechos: '',
                descripcion: ''
            },
            pruebas: {
                evidencia: '',
                testigo1: {
                    nombre: '',
                    direccion: '',
                    telefono: '',
                    correo: ''
                },
                testigo2: {
                    nombre: '',
                    direccion: '',
                    telefono: '',
                    correo: ''
                }
            }
        });
        setMostrarFormulario(false);
    }

    const mostrarFormularioDenuncia = () => {
        console.log("mostrarFormularioDenuncia");
        setMostrarFormulario(!mostrarFormulario);
    }


    return (
        <>
            <div className='contenedor-principal-corrupcion'>
            <Toaster />
                <div className='w-full topbar'>
                    <Topbar />
                </div>

                <div className="center-container">
                    <div className="card bg-base-100 custom-card-width shadow-xl">
                        <figure>
                            <img className='image-alcaldia'
                                src="https://servicios.cali.gov.co:9090/FormulariosAD/images/logoDenuncia.png"
                                alt="Alcaldía" />
                        </figure>
                        <div className="card-body">
                            {mostrarFormulario ? (
                                <>
                                    <span className="card-title-corrupcion">
                                        BIENVENIDO(A) AL CANAL DE DENUNCIA VIRTUAL POR PRESUNTOS HECHOS DE CORRUPCIÓN
                                        Leer con atención antes de interponer la denuncia
                                    </span>
                                    <p>
                                        1. Verificar si es un acto de corrupción lo que desea denunciar.<br />
                                        2. Presente una relación clara, detallada y precisa de los hechos de los cuales tiene conocimiento.<br />
                                        3. Tener las pruebas suficientes: DOCUMENTACIÓN, FOTOS, VIDEOS, AUDIO, o entre otros.<br />
                                        Si la denuncia que vas a presentar por presuntos actos de corrupción es cometido por servidores públicos NO vinculados a la Alcaldía de Cali, deberá presentar la misma directamente ante la entidad a la que se encuentre vinculado el funcionario público o contratista.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <span className="card-title-corrupcion">
                                        FORMULARIO DE DENUNCIA HECHOS DE CORRUPCIÓN
                                    </span>
                                    <p>
                                        El Decreto municipal 0516 de 2016, con el cual se reforma la estructura de la Alcaldía de Santiago de Cali, creó la Oficina Asesora de Transparencia que tiene la función de recibir información sobre presuntos hechos de corrupción y remitir esta a las instancias de control competentes. No es un órgano de control, por lo tanto, no realiza actividades de vigilancia o inspección.
                                    </p>
                                </>
                            )}

                            <p className="formato-paso-a-paso" onClick={mostrarFormularioDenuncia}>
                                <div className="contenedor-icon-formato-paso">
                                    <FaFileAlt className="icon-formato-paso" />
                                    {mostrarFormulario ? "Cerrar formato" : "Abrir formato para ser diligenciado"}
                                </div>
                            </p>

                            <p className="formato-paso-a-paso">
                                <div className="contenedor-icon-formato-paso">
                                    <FaArrowRight className="icon-formato-paso" />
                                    <a href="https://www.youtube.com/watch?v=4rl9nIfLdU8" target="_blank" rel="noopener noreferrer">
                                        Paso a paso para denunciar presuntos hechos de corrupción.
                                    </a>
                                </div>
                            </p>
                        </div>

                    </div>

                    <div>

                        {mostrarFormulario && (
                            <div className=" bg-base-100 custom-card-width ">
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        DATOS DEL DENUNCIANTE
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <form>
                                            {errors.denunciante && <div className="error-message">{errors.denunciante}</div>}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">NOMBRES</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="denunciante.nombreDenunciante"
                                                    placeholder="Nombres"
                                                    className="input input-bordered"
                                                    value={formValues.denunciante.nombreDenunciante}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">APELLIDOS</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="denunciante.apellidoDenunciante"
                                                    placeholder="Apellidos"
                                                    className="input input-bordered"
                                                    value={formValues.denunciante.apellidoDenunciante}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className='form-control'>
                                                <label className="label">
                                                    <span className="label-text">NUMERO DE IDENTIFICACIÓN</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="denunciante.numeroIdentificacion"
                                                    placeholder="N° de identificación"
                                                    className="input input-bordered"
                                                    value={formValues.denunciante.numeroIdentificacion}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className='form-control'>
                                                <label className="label">
                                                    <span className="label-text">SEXO</span>
                                                </label>
                                                <select
                                                    className="select select-bordered"
                                                    name="denunciante.sexo"
                                                    value={formValues.denunciante.sexo}
                                                    onChange={handleInputChange}
                                                >
                                                    <option disabled selected >Sexo</option>
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Femenino">Femenino</option>
                                                </select>
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">CORREO</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="denunciante.correo"
                                                    placeholder="Correo"
                                                    className="input input-bordered"
                                                    value={formValues.denunciante.correo}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">TELÉFONO</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="denunciante.telefono"
                                                    placeholder="Teléfono"
                                                    className="input input-bordered"
                                                    value={formValues.denunciante.telefono}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">DIRECCIÓN</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="denunciante.direccion"
                                                    placeholder="Dirección"
                                                    className="input input-bordered"
                                                    value={formValues.denunciante.direccion}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </form>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        DENUNCIA

                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className='card bg-base-100  shadow-xl'>
                                            <div className="card-body-corrupcion">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="message-accordion">DATOS DEL SERVIDOR PÚBLICO O CONTRATISTA INVOLUCRADO EN EL PRESUNTO HECHO DE CORRUPCIÓN</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <form>
                                            {errors.denuncia && <div className="error-message">{errors.denuncia}</div>}
                                            <div className='form-control mt-3'>
                                                <label className="label">
                                                    <span className="label-text">NOMBRES Y APELLIDOS</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Nombres y apellidos"
                                                    className="input input-bordered"
                                                    name="denuncia.nombresApellidos"
                                                    value={formValues.denuncia.nombresApellidos}
                                                    onChange={handleInputChange} />
                                            </div>

                                            <div className='form-control mt-3'>
                                                <label className="label">
                                                    <span className="label-text">CAMPOS O ROL</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Campos o rol"
                                                    className="input input-bordered"
                                                    name="denuncia.camposRol"
                                                    value={formValues.denuncia.camposRol}
                                                    onChange={handleInputChange} />
                                            </div>

                                            <div className='form-control mt-3'>
                                                <label className="label">
                                                    <span className="label-text">ORGANISMO AL QUE PERTENECE EL FUNCIONARIO
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Organismo"
                                                    className="input input-bordered"
                                                    name="denuncia.organismo"
                                                    value={formValues.denuncia.organismo}
                                                    onChange={handleInputChange} />
                                            </div>

                                            <div className='form-control mt-3'>
                                                <label className="label">
                                                    <span className="label-text">LUGAR DE LOS HECHOS</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Lugar de los hechos"
                                                    className="input input-bordered"
                                                    name="denuncia.lugarHechos"
                                                    value={formValues.denuncia.lugarHechos}
                                                    onChange={handleInputChange} />
                                            </div>

                                            <div className='form-control mt-3'>
                                                <label className="label">
                                                    <span className="label-text">FECHA DE LOS HECHOS</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    placeholder="Fecha de los hechos"
                                                    className="input input-bordered"
                                                    name="denuncia.fechaHechos"
                                                    value={formValues.denuncia.fechaHechos}
                                                    onChange={handleInputChange} />
                                            </div>

                                            <div className='form-control mt-3'>
                                                <label className="label">
                                                    <span className="label-text">DESCRIPCION DE LOS HECHOS</span>
                                                </label>
                                                <textarea
                                                    className="textarea textarea-bordered"
                                                    placeholder="Descripción de los hechos"
                                                    name="denuncia.descripcion"
                                                    value={formValues.denuncia.descripcion}
                                                    onChange={handleInputChange}></textarea>
                                            </div>
                                        </form>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        PRUEBAS
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className='card bg-base-100  shadow-xl'>
                                            <div className="card-body-corrupcion">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="message-accordion">ANEXA AQUÍ LA EVIDENCIA QUE SOPORTE TU DENUNCIA (documentos, imágenes, videos, audios, etc.). RECUERDA QUE ESTA ES CLAVE PARA EL PROCESO</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <form>
                                            <div className='mt-3 mb-3'>
                                                <label className="label">
                                                    <span className="label-text">EVIDENCIA</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    placeholder="Evidencia"
                                                    className="input "
                                                    name='' />
                                            </div>

                                            <div className='card bg-base-100  shadow-xl'>
                                                <div className="card-body-corrupcion">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="message-accordion">EN EL CASO QUE CUENTES CON TESTIGOS DE LOS HECHOS DENUNCIADOS DILIGENCIA LOS SIGUIENTES DATOS.</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='pt-3'>
                                                <label className="testigos"> TESTIGO 1</label>
                                                <div className='form-control mt-3'>
                                                    <label className="label">
                                                        <span className="label-text">NOMBRE COMPLETO</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nombre completo"
                                                        className="input input-bordered"
                                                        name='pruebas.testigo1.nombre'
                                                        value={formValues.pruebas.testigo1.nombre}
                                                        onChange={handleInputChange} />
                                                </div>

                                                <div className='form-control mt-3'>
                                                    <label className="label">
                                                        <span className="label-text">DIRECCION</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Dirección"
                                                        className="input input-bordered"
                                                        name='pruebas.testigo1.direccion'
                                                        value={formValues.pruebas.testigo1.direccion}
                                                        onChange={handleInputChange} />
                                                </div>

                                                <div className='form-control mt-3'>
                                                    <label className="label">
                                                        <span className="label-text">TELEFONO</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Telefono"
                                                        className="input input-bordered"
                                                        name='pruebas.testigo1.telefono'
                                                        value={formValues.pruebas.testigo1.telefono}
                                                        onChange={handleInputChange} />
                                                </div>

                                                <div className='form-control mt-3'>
                                                    <label className="label">
                                                        <span className="label-text">CORREO ELECTRONICO</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Correo electronico"
                                                        className="input input-bordered"
                                                        name='pruebas.testigo1.correo'
                                                        value={formValues.pruebas.testigo1.correo}
                                                        onChange={handleInputChange} />
                                                </div>

                                            </div>

                                            <div className='pt-3'>
                                                <label className='testigos' > TESTIGO 2</label>
                                                <div className='form-control mt-3'>
                                                    <label className="label">
                                                        <span className="label-text">NOMBRE COMPLETO</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nombre completo"
                                                        className="input input-bordered"
                                                        name='pruebas.testigo2.nombre'
                                                        value={formValues.pruebas.testigo2.nombre}
                                                        onChange={handleInputChange} />
                                                </div>

                                                <div className='form-control mt-3'>
                                                    <label className="label">
                                                        <span className="label-text">DIRECCION</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Dirección"
                                                        className="input input-bordered"
                                                        name='pruebas.testigo2.direccion'
                                                        value={formValues.pruebas.testigo2.direccion}
                                                        onChange={handleInputChange} />
                                                </div>

                                                <div className='form-control mt-3'>
                                                    <label className="label">
                                                        <span className="label-text">TELEFONO</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Telefono"
                                                        className="input input-bordered"
                                                        name='pruebas.testigo2.telefono'
                                                        value={formValues.pruebas.testigo2.telefono}
                                                        onChange={handleInputChange} />
                                                </div>

                                                <div className='form-control mt-3'>
                                                    <label className="label">
                                                        <span className="label-text">CORREO ELECTRONICO</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Correo electronico"
                                                        className="input input-bordered"
                                                        name='pruebas.testigo2.correo'
                                                        value={formValues.pruebas.testigo2.correo}
                                                        onChange={handleInputChange} />
                                                </div>

                                            </div>

                                        </form>
                                    </AccordionDetails>
                                </Accordion>

                                <div className='info-denuncia mt-3'>
                                    <div className='card bg-base-100  shadow-xl'>
                                        <div className="card-body-corrupcion">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="message-accordion">Recuerda que si tu denuncia fue presentada de forma anónima la respuesta se hará pública en la Página Web de la Alcadía en la sección: Servicios a la ciudadanía-Información de Interés.
                                                        ¡GRACIAS POR DENUNCIAR!</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='info-denuncia mt-3'>
                                    <div className='card bg-base-100  shadow-xl'>
                                        <div className="card-body-corrupcion">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="message-accordion">En cumplimiento de la Ley Estatutaria 1581 del 17 de Octubre de 2012 "Por la cual se dictan disposiciones generales para la protección de datos personales", la Alcaldía de Santiago de Cali informa, que siendo responsable y encargado del tratamiento de los datos personales de los habitantes del municipio, estos serán utilizados únicamente en el desarrollo de las funciones propias y no se compartirán con nadie para fines diferentes. Esta información es y será utilizada para conocer más al ciudadano que se acerca a la Alcaldía de Santiago de Cali. Sus respuestas serán estrictamente confidenciales y serán usadas por la Oficina Asesora de Transparencia solo con fines estadísticos.</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="btn-corrupcion btn btn-block btn-lg mt-3" onClick={handleSubmit} >Guardar</button>
                                </div>

                            </div>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Corrupcion