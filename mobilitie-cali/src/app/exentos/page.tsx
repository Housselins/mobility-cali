"use client";
import { Topbar } from "@/components/topbar/Topbar";
import "./Exentos.css";
import { Footer } from "@/components/footer/Footer";

const Exentos = () => {

    return (
        <>
            <div className="container-organismo">
                <Topbar />
                <div className="infoPrincipal-organismo">
                    <h1 className="title-organismo">Exentos del Pico y Placa</h1>
                    <p>
                        Los propietarios de vehículos particulares deben enviar una solicitud escrita por el peticionario y/o beneficiario, dirigida a la Secretaría de Movilidad, con los respectivos documentos como la copia de las licencias de tránsito de los vehículos; copia del documento de identidad del beneficiario y/o solicitante. Además, deben tener su documentación al día como el Seguro Obligatorio de Accidentes de Tránsito (SOAT), la revisión técnico-mecánica y estar a paz y salvo con el pago del impuesto vehicular de la última vigencia exigible:
                    </p>
                    <div className="pgel">
                        <p className="pgel-img w-full">
                            <img 
                                className="img-demarcacion w-full"
                                src="https://www.cali.gov.co/movilidad/publicaciones/164977/exentos--del-pico-y-placa/info/principal/media/galeria222059.jpg"
                                alt="Agente de tránsito en labores de regulación en la vía Cali-Jamundí."
                            />

                        </p>

                        <p className="pgel-img w-full">
                            <img 
                                className="img-demarcacion w-full"
                                src="https://www.cali.gov.co/movilidad/publicaciones/164977/exentos--del-pico-y-placa/info/principal/media/galeria222060.jpg"
                                alt="Agente de tránsito en labores de regulación en la vía Cali-Jamundí."
                            />

                        </p>

                        <br />
                        <p>
                        Los interesados deberán radicar la solicitud dirigida a la Secretaría de Movilidad en la ‘ventanilla única’ de la Oficina de Atención al Ciudadano, ubicada en el sótano 1 del edificio de Alcaldía (CAM) o por la página web de la Administración Distrital (www.cali.gov.co).
                        </p>


                    </div>


                </div>
            </div>
            <Footer />
        </>
    );
};

export default Exentos;
