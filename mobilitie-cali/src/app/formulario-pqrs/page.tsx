"use client";
import React, { ChangeEvent, useEffect, useState } from 'react'
import './FormPQRS.css'
import { Topbar } from '@/components/topbar/Topbar'
import axios from 'axios';
import { toast, Toaster } from "react-hot-toast";
import { CustomImageInput } from '@/presentation';


const FormPQRS = () => {

  useEffect(() => {
    fetchCountries();
  }, []);
  const [step, setStep] = useState(1); // Estado para el paso actual
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    identificacion: '',
    direccion: '',
    correo: '',
    telefono: '',
    pais: '',
    departamento: '',
    ciudad: '',
    tipoSolicitud: '',
    contenidoSolicitud: '',
    dependencia: '',
    image: '',

  });

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (event: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (image: string) => {
    setFormData({
      ...formData,
      image,
    });
  };


  // Validación de los campos
  const isStep1Complete = () => {
    const { nombres, apellidos, identificacion } = formData;
    return nombres && apellidos && identificacion;
  };

  const isStep2Complete = () => {
    const { direccion, correo, telefono, pais, departamento, ciudad } = formData;
    return direccion && correo && telefono && pais && departamento && ciudad;
  };

  // Función para avanzar al siguiente paso
  const handleNextStep = (e: any) => {
    e.preventDefault();
    if (step === 1 && isStep1Complete()) {
      setStep(2);
    } else if (step === 2 && isStep2Complete()) {
      setStep(3);
    } else if (step === 3) {
      guardarPqrs();
    } else {
      alert('Por favor completa todos los campos requeridos');
    }
  };

  const handlePreviousStep = (e: any) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1); // Retrocede un paso
    }
  };

  const guardarPqrs = async () => {
    try {
      console.log('pqrs', formData);
      const res = await axios.post('http://localhost:4000/pqrs', formData);
      console.log(res);
      toast.success("Petición creada exitosamente");
    } catch (error) {
      console.log(error);
      toast.error("Error al crear la petición");
    }
    clearForm();

  }

  const clearForm = () => {
    setFormData({
      nombres: '',
      apellidos: '',
      identificacion: '',
      direccion: '',
      correo: '',
      telefono: '',
      pais: '',
      departamento: '',
      ciudad: '',
      tipoSolicitud: '',
      contenidoSolicitud: '',
      dependencia: '',
      image: '',
    });
  }

  const [countries, setCountries] = useState<string[]>([]);

  const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    setCountries(data.map((country: any) => country.name.common));
  };

  return (
    <>
      <Topbar />
      <div className='cotainer-pqrs '>
        <div className=' contenedor-central  '>
          <form onSubmit={handleNextStep}>
            <div className='contenedor-titulo'>
              <h1 className='title-pqrs'>Radicación de peticiones, quejas y reclamos</h1>
            </div>

            <div className='video-pqrs'>
              <iframe
                width="560"
                height="315"
                title="Video PQRS"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                src="https://www.youtube.com/watch?v=0jwJ2G0VEa0&t=1s"
              ></iframe>
            </div>

            <div className='center-container'>
              <div className="steps-container">
                <ul className="steps">
                  <li className={`step ${step === 1 ? 'step-primary' : ''}`}>Paso 1</li>
                  <li className={`step ${step === 2 ? 'step-primary' : ''}`}>Paso 2</li>
                  <li className={`step ${step === 3 ? 'step-primary' : ''}`}>Paso 3</li>
                </ul>
              </div>

              {step === 1 && (
                <div className="bg-white custom-card-width">

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">NOMBRES</span>
                    </label>
                    <input
                      type="text"
                      name="nombres"
                      value={formData.nombres}
                      onChange={handleInputChange}
                      placeholder="Nombres"
                      className="input input-bordered bg-transparent"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">APELLIDOS</span>
                    </label>
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      placeholder="Apellidos"
                      className="input input-bordered bg-transparent"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Número de identificación</span>
                    </label>
                    <input
                      type="number"
                      name="identificacion"
                      value={formData.identificacion}
                      onChange={handleInputChange}
                      placeholder="Escribe tu cedula sin puntos, comas o guiones. Ej: 79940063"
                      className="input input-bordered bg-transparent"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className={step === 1 ? 'btn-primero btn btn-block btn-lg mt-6' : 'btn-siguiente btn btn-block btn-lg mt-6'}
                    >
                      SIGUIENTE
                    </button>
                  </div>

                </div>
              )}

              {step === 2 && (
                <div className="bg-white custom-card-width">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Dirección de residencia</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Dirección de residencia actual. Ej: Calle 3C # 65 - 60, Cali"
                      className="input input-bordered bg-transparent"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Correo electrónico</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      className="input input-bordered bg-transparent"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Telefono</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Telefonos. Ej: 321-456-7890"
                      className="input input-bordered bg-transparent"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">País</span>
                    </label>
                    <select
                      name="pais"
                      value={formData.pais}
                      onChange={handleInputChange}
                      className="select select-bordered"
                    >
                      <option value="">Seleccione el país</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Departamento</span>
                    </label>
                    <select
                      name="departamento"
                      value={formData.departamento}
                      onChange={handleInputChange}
                      className="select select-bordered"
                    >
                      <option value="">Seleccione el departamento</option>
                      <option value="Antioquia">Antioquia</option>
                      <option value="Cundinamarca">Cundinamarca</option>
                      <option value="Valle del Cauca">Valle del Cauca</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Ciudad</span>
                    </label>
                    <select
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      className="select select-bordered"
                    >
                      <option value="">Seleccione la ciudad</option>
                      <option value="Medellín">Medellín</option>
                      <option value="Cali">Cali</option>
                      <option value="Bogotá">Bogotá</option>
                    </select>

                  </div>



                  <div className="button-container">
                    <button
                      onClick={handlePreviousStep}
                      className="btn-anterior btn btn-block btn-lg mt-6"
                    >
                      ANTERIOR
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="btn-siguiente btn btn-block btn-lg mt-6"
                    >
                      SIGUIENTE
                    </button>
                  </div>

                </div>
              )}

              {step === 3 && (
                <div className="bg-white custom-card-width">

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Tipo de solicitud</span>
                    </label>
                    <select
                      name="tipoSolicitud"
                      value={formData.tipoSolicitud || ''}
                      onChange={handleInputChange}
                      className="select select-bordered"
                    >
                      <option value="">Seleccione el tipo de solicitud</option>
                      <option value="Petición general">Petición general</option>
                      <option value="Queja">Queja</option>
                      <option value="Reclamo">Reclamo</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Contenido de la solicitud</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered bg-transparent"
                      name="contenidoSolicitud"
                      placeholder='Escriba en maximo 600 caracteres en que consiste su solicitud'
                      value={formData.contenidoSolicitud}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Dependencia a donde va dirigida</span>
                    </label>
                    <select
                      name="dependencia"
                      value={formData.dependencia || ''} // Maneja caso donde sea vacío
                      onChange={handleInputChange}
                      className="select select-bordered"
                    >
                      <option value="">Seleccione una dependencia</option> {/* Opción vacía por defecto */}
                      <option value="SECRETARIA DE DESARROLLO TERRITORIAL Y PARTICIPACION CIUDADANA (PQRS)">
                        SECRETARIA DE DESARROLLO TERRITORIAL Y PARTICIPACION CIUDADANA (PQRS)
                      </option>
                    </select>
                  </div>

                  <div className="form-control mt-6">
                    <label className="label">
                      <span className="label-text">Soporte</span>
                    </label>
                    <CustomImageInput
                      className="pt-4"
                      returnFile={handleImageChange} />
                  </div>

                  <div className="button-container">
                    <button
                      onClick={handlePreviousStep}
                      className="btn-anterior btn btn-block btn-lg mt-6"
                    >
                      ANTERIOR
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="btn-siguiente btn btn-block btn-lg mt-6"
                    >
                      ENVIAR
                    </button>
                  </div>


                </div>

              )}

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormPQRS