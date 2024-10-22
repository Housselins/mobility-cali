

import { Topbar } from "@/components/topbar/Topbar";
import "./espacio.css";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FaArrowDown, FaPlus } from "react-icons/fa6";
const espacioParticipacion = () => {

    return (

        <div className="container-participacion">
            <Topbar />
            <div className="infoPrincipal-participacion">
                <h1 className="title-participacion">Espacios e Instancias de Participación Ciudadana de Santiago de Cali Distrito Especial</h1>
                <div className="pgEspacio">
                    <h2 className="departamentos-administrativos">Departamentos Administrativos </h2>
                    <div className="bg-white custom-card-width mt-3">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaPlus />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p className="title-accordion">Departamento Administrativo de Gestión del Medio Ambiente (DAGMA)</p>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Consejo Ambiental Comunitario Municipal - CACM
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p><strong>Objetivo:</strong> El Consejo Ambiental Comunitario Municipal es la máxima instancia de participación comunitaria en los asuntos ambientales de Santiago de Cali. Este Consejo tiene funciones de; concertación, gestión, decisión, fiscalización, iniciativa, consulta e información en temas ambientales del Distrito, ante las diferentes instancias del Gobierno local. Participa en el diseño, formulación, implementación y seguimiento de la Política Ambiental de Santiago de Cali, contribuyendo a garantizar el derecho a gozar de un ambiente sano.</p>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Consejo Municipal de Desarrollo Rural (CDMR)                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p> <strong>Objetivo:</strong> El Consejo Municipal de Desarrollo Rural en Santiago de Cali funciona como instancia superior de concertación entre las autoridades nacionales, regionales y locales, con las comunidades rurales y las entidades públicas de la zona rural de Santiago de Cali, y como un componente adicional del Sistema de Gestión Ambiental Municipal (SIGAM), con el fin de propender por el desarrollo de acciones tendientes a la protección ambiental y el desarrollo sostenible del área rural</p>
                                    </AccordionDetails>
                                </Accordion>

                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaPlus />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p className="title-accordion">Departamento Administrativo de Planeación Municipal  </p>                            </AccordionSummary>
                            <AccordionDetails>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Comité de Arte Público en la Ciudad de Santiago De Cali
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p><strong>Objetivo:</strong></p> <br></br>
                                        <ul className="lista-comite" style={{ listStyleType: "disc" }} >
                                            <li className="pb-3">
                                                Asesorar al Municipio de Santiago de Cali - Subdirección de Espacio Público y Ordenamiento Urbanístico o a la dependencia que haga sus veces en temas de expresión artística que se desarrollen en el espacio público del Municipio de Santiago de Cali.
                                            </li>
                                            <li className="pb-3">Emitir conceptos técnicos frente a las posibles intervenciones de arte público que se realicen en el Municipio de Santiago de Cali.
                                            </li>
                                            <li className="pb-3">Orientar y recomendar sobre los lugares del municipio de Santiago de Cali dónde se permitirá el desarrollo del arte público.
                                            </li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Comité de Espacio Público
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p> <strong>Objetivo:</strong>  Asesorar al Gobierno en la definición de políticas, directrices, programas y proyectos para la gestión, mantenimiento y preservación del espacio público. Conceptuar sobre los proyectos que involucren actuaciones sobre el espacio público de carácter emblemático o cuya área sea superior a 10.000 m2.</p>
                                    </AccordionDetails>
                                </Accordion>

                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaPlus />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p className="title-accordion">Departamento Administrativo de Tecnologías de la Información y las Telecomunicaciones (DATIC)</p>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Comité del Equipo Técnico de Asistencia de Gobierno Digital
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p><strong>Objetivo:</strong>Funciones. El Equipo Técnico de Asistencia de Gobierno Digital cumplirá las siguientes funciones generales:</p> <br></br>
                                        <ul className="lista-comite" style={{ listStyleType: "disc" }}>
                                            <li className="pb-3">
                                                Coordinar y gestionar las actividades necesarias para el cumplimiento de los logros de los componentes de Gobierno Digital.
                                            </li>
                                            <li className="pb-3">Diseñar, asesorar, impulsar y poner en marcha las estrategias para la debida implementación de la Política de Gobierno Digital.

                                            </li>
                                            <li className="pb-3">Apoyar la implementación de la Política de Gobierno Digital en los organismos de la Administración.

                                            </li>

                                            <li className="pb-3">Definir acciones que garanticen la permanencia de los avances alcanzados en la implementación de la Política de Gobierno Digital y permitan generar capacidad instalada.
                                            </li>

                                            <li className="pb-3">Presentar estrategias de articulación y coordinación con los organismos que lo integran, con el fin de fortalecer la Política y evitar la colisión de competencias y la duplicidad de funciones.
                                            </li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        CTO-Comité Tecnológico Operativo
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p> <strong>Objetivo:</strong>   Equipo de trabajo interdisciplinario y polivalente, que desarrollará labores tendientes a la ejecución e implementación de las políticas que se adopten en materia de las tecnologías de la información y las comunicaciones (TIC).</p>
                                    </AccordionDetails>
                                </Accordion>

                            </AccordionDetails>
                        </Accordion>

                        <h2 className="departamentos-administrativos mt-10">Secretarias</h2>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaPlus />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                               <p className="title-accordion">Secretaria de Bienestar Social</p> 
                            </AccordionSummary>
                            <AccordionDetails>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Comisión de Concertación y Decisión
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p><strong>Objetivo:</strong> Serán instancias de concertación y decisión del orden nacional, departamental, y municipal, a razón de una por cada entidad territorial, las cuales asumirán funciones de planeación, concertación de agendas públicas y generación de los mecanismos de ejecución de las mismas en cada territorio.</p>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Comités Municipales de Discapacidad
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p> <strong>Objetivo:</strong> El Comité Municipal de Discapacidad es un organismo de deliberación, construcción, seguimiento y verificación de la puesta en marcha de las políticas, estrategias y programas que garanticen la inclusión social de las personas con discapacidad, en coordinación con el Sistema Nacional de Discapacidad.</p>
                                    </AccordionDetails>
                                </Accordion>

                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaPlus />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p className="title-accordion">Secretaria de Cultura</p> 
                            </AccordionSummary>
                            <AccordionDetails>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Comité Central del Festival de Música del Pacífico Petronio Álvarez
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p><strong>Objetivo:</strong>Acompañar conceptualmente la planeación, organización y el desarrollo del Festival de Música del Pacifico Petronio Álvarez.</p>

                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Comité Conceptual Festival Mundial de Salsa Cali
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p> <strong>Objetivo:</strong>  Brindarle a la comunidad en general y al gremio de la Salsa en particular, un espacio de participación ciudadana activa, donde se plantean percepciones, necesidades e ideas mediante la concertación, con el fin de enriquecer el proceso cultural y concebir conjuntamente un festival incluyente a través de los actores que componen el ecosistema de la salsa y los portadores de la manifestación cultural. Así mismo, orientar a la Secretaría de Cultura en su calidad de organizador y responsable del Festival, respecto de los lineamientos, criterios y desarrollo del mismo en sus diferentes componentes.</p>
                                    </AccordionDetails>
                                </Accordion>

                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaPlus />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                               <p className="title-accordion">Secretaría de Desarrollo Económico</p> 
                            </AccordionSummary>
                            <AccordionDetails>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Comité de la Economía Creativa - Naranja en Santiago de Cali
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p><strong>Objetivo:</strong>Implementar acciones y medidas orientadas a estimular el sector de la economía creativa en la ciudad de Santiago de Cali mediante una gestión interinstitucional que permita articular a todos los actores públicos relevantes.</p> <br></br>

                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Consejo Asesor para el Desarrollo Económico del Municipio de Santiago de Cali (CADEC)
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p> <strong>Objetivo:</strong> El Consejo Asesor para el Desarrollo Económico del Municipio de Santiago de Cali, será una instancia asesora y consultiva, de carácter permanente, del gobierno Municipal que analizará, articulará y evaluará los lineamientos de todas las acciones y estrategias conducentes al desarrollo económico del Municipio.</p>
                                    </AccordionDetails>
                                </Accordion>

                            </AccordionDetails>
                        </Accordion>

                        <h2 className="departamentos-administrativos mt-10">Unidades Administrativas Especiales                        </h2>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaPlus />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p className="title-accordion"> Unidad Administrativa Especial de Servicios Públicos Municipales</p>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FaArrowDown />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Mesa de Agua
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p><strong>Objetivo:</strong>Socializar inversión a las Juntas de Acueducto y Alcantarillado -JAA de la zona rural de Cali.</p>
                                        <br />
                                        <ul >
                                            Entidades que asisten:
                                            <li>1- Unidad Administrativa Especial de Servicios Públicos -UAESP.</li>
                                            <li>2- Secretaría de Salud Cali.</li>
                                            <li>3- Secretaría de Salud Valle.</li>
                                            <li>4- Corporación Autónoma Regional del Valle del Cauca - CVC.</li>
                                            <li>5- Parque Nacional Natural Fallones de Cali - PNNFC.</li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>

                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default espacioParticipacion;