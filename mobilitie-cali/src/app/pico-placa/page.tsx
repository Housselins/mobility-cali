"use client";
import { Topbar } from "@/components/topbar/Topbar";
import "./pico-placa.css";
import { Footer } from "@/components/footer/Footer";

const PicoPlaca = () => {

    return (
        <>
            <div className="container-organismo">
                <Topbar />
                <div className="infoPrincipal-organismo">
                    <h1 className="title-organismo">Así funcionará el ‘pico y placa’ durante el segundo semestre de 2024: se reduce una hora de la medida que va de 6:00 a.m. a 7:00 p.m.</h1>
                    <div className="pgel">
                        <p className="pgel-img w-full">
                            <img style={{ width: "100%" }}
                                className="img-demarcacion w-full border"
                                src="https://www.cali.gov.co/movilidad/publicaciones/181903/asi-funcionara-el-pico-y-placa-durante-el-segundo-semestre-de-2024-se-reduce-una-hora-de-la-medida-que-va-de-600-am-a-700-pm/info/principal/media/pubInt/thumbs/thpub_700X400_181903.jpg"
                                alt="Agente de tránsito en labores de regulación en la vía Cali-Jamundí."
                            />

                        </p>
                        <p>
                            El ‘pico y placa’ para el segundo semestre de 2024 inicia el 2 de julio (teniendo en cuenta que el 1 es festivo) y se extiende hasta el 31 de diciembre. La gran novedad, en comparación con el primer semestre del calendario, es que se reduce una hora de la medida, que irá de 6:00 a.m. a 7:00 p.m., tomando como referencia el último dígito de la placa.


                        </p>
                        <br />
                        <p>
                            Así lo estableció la Secretaría de Movilidad Distrital, al presentar el decreto por medio del cual se adoptan las medidas de carácter temporal, para el mejor ordenamiento del tránsito de vehículos automotores por las vías públicas y privadas abiertas al público en el Distrito Especial, Deportivo, Cultural, Turístico, Empresarial y de Servicios de Santiago de Cali.
                        </p>

                        <p className="pgel-img w-full pt-4 ">
                            <img
                                className="img-demarcacion w-full "
                                src="https://www.cali.gov.co/movilidad/publicaciones/181903/asi-funcionara-el-pico-y-placa-durante-el-segundo-semestre-de-2024-se-reduce-una-hora-de-la-medida-que-va-de-600-am-a-700-pm/info/principal/media/galeria305192.png"
                                alt="Agente de tránsito en labores de regulación en la vía Cali-Jamundí."
                            />

                        </p>



                        <div className="subsecretarias">
                            <p>
                                La medida aplica para los vehículos que ingresan y/o salen del perímetro urbano del Distrito de Santiago de Cali, desde y hacia el resto del país.
                            </p>

                            <p className="pt-2">
                                “El único cambio en este ‘pico y placa’ es el horario, que será de 6:00 a.m. a 7:00 p.m. Las personas que no tienen restricción serán las mismas: vehículos de más de cinco (5) toneladas de carga; aquellos vehículos que son híbridos y demás contenidos en el decreto. Los invitamos a conocer el documento oficial”, manifestó Wilmer Tabares, secretario de Movilidad de Cali.
                            </p>

                            <strong><p style={{ color: "#555555", fontWeight: "700" }} className="pedagogia">
                                Pedagogía y sanciones
                            </p></strong>

                            <p>
                                La primera semana, del 2 al 5 de julio, será pedagógica con el objetivo de facilitar a los caleños la adaptación a la rotación. A partir del lunes 8 de julio, inician las sanciones por el incumplimiento de la medida.
                            </p>

                            <strong><p className="pt-4" style={{ color: "#555555", fontWeight: "700" }} >
                                ¿Cuánto cuesta una multa por incumplir el ‘pico y placa’?
                            </p></strong>


                            <p className="pt-4">
                                La sanción corresponde a 15 salarios mínimos diarios vigentes (S.M.D.V.), equivalente a 650.000 pesos. Los sancionados tendrán la alternativa de realizar un curso de infractores en los primeros cinco días, contados a partir de la fecha de elaboración del comparendo por un agente de tránsito. En este caso, pueden acceder al 50% de descuento.
                            </p>

                            <p className="pt-2" style={{ color: "#555555", fontWeight: "700" }}>
                                ¿Quiénes están exentos de la medida?
                            </p>

                            <p className="pt-2">
                                1. Vehículos con placas oficiales, híbridos y eléctricos parametrizados por tipo de combustible eléctrico, gasolina/eléctrico o diésel/eléctrico.
                            </p>

                            <p className="pt-2">
                                2. Los vehículos de carga con capacidad mayor o igual a cinco (5) toneladas, según su licencia de tránsito.
                            </p>

                            <p className="pt-2">
                                3. Vehículos cuyos propietarios paguen la tasa por congestión o contaminación, establecida mediante el Acuerdo Municipal No. 0563 de 2023, o la norma que la modifique.

                            </p>

                            <p className="pt-2">
                                4. Las motocicletas.
                            </p>

                            <p className="pt-4" style={{ color: "#555555", fontWeight: "700" }}>
                                Para tener en cuenta…
                            </p>

                            <p className="pt-2">La medida del ‘pico y placa’ no aplica los días sábados, domingos y feriados establecidos por la ley o cuando excepcionalmente lo defina la autoridad competente.</p>

                        </div>
                    </div>


                </div>
            </div>
            <Footer/>
        </>
    );
};

export default PicoPlaca;
