import { borderRight } from "@mui/system";
import { useState } from "react"

export default function DirAgrYGI() {
    const [optsTabla, setOptsTabla] = useState([
        {
            nombre: "Andett",
            contacto: "(602)4184262 - (+57) 3187344732",
            direccion: "Cra. 28D # 50 - 97, barrio Sindical, Cali",
            correo: "andettseccionalcali@hotmail.com"
        },
        {
            nombre: "Asagetran",
            contacto: "(+57) 3113599663",
            direccion: "Cl. 5A # 23-32, barrio Alameda, Cali",
            correo: "asagetrancali2013@hotmail.com"
        },
        {
            nombre: "Autos Y Taxis Morales Gómez Y Cia - Taxi Y Autos Cali S.A.S",
            contacto: "(602)6640000",
            direccion: "Av. 3N # 39N-35",
            correo: "contabilidad1@taxisautoscali.com"
        },
        {
            nombre: "Cia Transportadora Verde Bretaña",
            contacto: "(+57) 3168294385",
            direccion: "Cl. 54 #41C-30",
            correo: "verdebretana@hotmail.com"
        },
        {
            nombre: "Coop Multi Taxis Aeropu Palmaseca-Cooperativa Multiactiva De Taxistas Ltda.",
            contacto: "(602)5571563",
            direccion: "Muelle Principal Aeropuerto de Palmaseca - Primer Nivel",
            correo: "armandoescobar23@hotmail.com"
        },
        {
            nombre: "Cooperativa de Transportadores Cali Puerto Ltda.",
            contacto: "(602)3725044",
            direccion: "Cl. 31 # 12-27",
            correo: "gerencia.cootranscalipuerto@gmail.com"
        },
        {
            nombre: "Cooperativa De Transportadores Solidarios",
            contacto: "(602)3231979",
            direccion: "Cra. 70 # 1-36 Oeste",
            correo: "cootransol@hotmail.com"
        },
        {
            nombre: "Cooperativa De Transportadores Unidos",
            contacto: "(+57) 3147089235",
            direccion: "Cl. 1 # 52-01",
            correo: "cootransunidos24@hotmail.com"
        },
        {
            nombre: "Cooperativa Especial Transporte y Servicios La Ermita Ltda.",
            contacto: "(+57) 3008026715",
            direccion: "Cl. 31N # 2BN-106",
            correo: "gerencia@cooplaermita.com"
        },
        {
            nombre: "Cooperativa Especial Transporte y Servicios La Ermita Ltda.",
            contacto: "(+57) 3163989572",
            direccion: "Cl. 21N # 2BN-106",
            correo: "gerencia@cooplaermita.com"
        },
        {
            nombre: "Cooperativa Especializada de Transporte y Servicios La Ermita Ltda.",
            contacto: "(+57) 3008026715",
            direccion: "Cl. 31N # 2BN-106",
            correo: "gerencia@cooplaermita.com"
        },
        {
            nombre: "Cooperativa Int. De Transportes El Triunfo",
            contacto: "(+57) 3164314346",
            direccion: "Cra. 44 # 15-57, Las Granjas",
            correo: "cooperativaeltriunfo2015@gmail.com"
        },
        {
            nombre: "Cooperativa Int. De Transportes Tropicana Ltda.",
            contacto: "(+57) 3105036051",
            direccion: "Cra. 33 # 14-05, Cristóbal colon",
            correo: "transtropicana@hotmail.com"
        },
        {
            nombre: "Cooperativa Integral De Transportes Florida Cali Ltda.",
            contacto: "(+57) 3113406940",
            direccion: "Cl. 30 Norte # 2BN-42, Local 625",
            correo: "busespapagayo@hotmail.com"
        },
        {
            nombre: "Cooperativa Multiactiva de Transportes SINDIUNION",
            contacto: "(+57) 3158164123",
            direccion: "Trv. 25 #23-16",
            correo: "coopsindiunioncali@gmail.com"
        },
        {
            nombre: "El Alcázar S.A.S",
            contacto: "(+57) 3164476029",
            direccion: "Cra. 56 # 3-156",
            correo: "elalcazar2015@gmail.com"
        },
        {
            nombre: "Empresa De Transportes Amarillo Ltda.",
            contacto: "(602)3343721 - (602)3342101",
            direccion: "Cl. 70 # 39-04"
        },
        {
            nombre: "Empresa De Transportes Cañaveral S.A",
            contacto: "(+57) 3202571733",
            direccion: "Cra. 94 # 1-2ABIS OESTE - 06",
            correo: "transportecanaveral@gmail.com"
        },
        {
            nombre: "Empresa De Transportes Río Cali S.A",
            contacto: "(+57) 3174327866",
            direccion: "Cra. 36 # 104-51, Arroyohondo",
            correo: "notificacionesjudicialesrc@gmail.com"
        },
        {
            nombre: "Empresa De Transportes Santiago De Cali Alameda S.A",
            contacto: "(+57) 3176655338",
            direccion: "Cra. 70 # 1-71",
            correo: "contadora@alameda.com.co"
        },
        {
            nombre: "Empresa de Transportes Sultana del Valle S.A.S",
            contacto: "(602)6684001",
            direccion: "Cl. 30N # 2AN-29, Of 201-1",
            correo: "info@transultana.com"
        },
        {
            nombre: "Empresa Transporte Taxis Sintranspublic S.A",
            contacto: "(602)5146681 - (602)5571563",
            direccion: "Cl. 5A # 22-36",
            correo: "armandoescobar23@hotmail.com"
        },
        {
            nombre: "Empresa Transporte Unión De Taxistas S.A",
            contacto: "(602)2252736",
            direccion: "Cra. 30 # 30-73",
            correo: "ariasocamponelly@hotmail.com"
        },
        {
            nombre: "Líneas California S.A.S",
            contacto: "(602)6635063",
            direccion: "Cl. 70 # 7B-03",
            correo: "nexsar_339@hotmail.com"
        },
        {
            nombre: "Radio Taxi Aeropuerto - Taxis Libres",
            contacto: "(+57) 3004084937",
            direccion: "Cl. 52 # 1B-170, Salomia",
            correo: "gerenterta@carreracali.com"
        },
        {
            nombre: "Radio Taxi Aeropuerto S.A",
            contacto: "(602)6025241044 - (+57) 3176432224",
            direccion: "Cl. 52 # 1B-160",
            correo: "ysilva@carreracali.com"
        },
        {
            nombre: "Radio Taxis Fundadores S.A.S",
            contacto: "(+57) 3183739032",
            direccion: "Cl. 13 # 48a-31",
            correo: "radiotaxisfundadores@hotmail.com"
        },
        {
            nombre: "Servintegrados Del Valle S.A.S",
            contacto: "(602)5534621 - (602)5534650",
            direccion: "Cl. 9 # 63A-05"
        },
        {
            nombre: "Sintraestatales",
            contacto: "(602)4184254",
            direccion: "Cra. 3 # 56-90, barrio Salomia, Cali",
            correo: "sintraestatales@hotmail.com"
        },
        {
            nombre: "Tax Emperador S.A.S",
            contacto: "(602)3230259",
            direccion: "Cra. 70 # 1-36 Oeste",
            correo: "contabilidad@taxemperadorsas.com"
        },
        {
            nombre: "Taxexpress Cali S.A.S - Tax Rios",
            contacto: "(+57) 3163693646",
            direccion: "Av. Paso Ancho # 32-81",
            correo: "gerenciacali@taxexpress.com.co"
        },
        {
            nombre: "Taxis Valcali S.A.",
            contacto: "(+57) 3207088444",
            direccion: "Cra. 28D # 50 - 97, barrio Sindical, Cali",
            correo: "valcalitax@gmail.com"
        },
        {
            nombre: "Transportadora Especial T&S S.A.S",
            contacto: "(602)6680700 - (+57) 3147875802",
            direccion: "Cl. 23D # 3N-20, Of 3",
            correo: "transportadoraespecialts@gmail.com"
        },
        {
            nombre: "Transporte Turistico Palmira S.A.",
            contacto: "(+57) 3158366537",
            direccion: "Cl. 3 # 50-23, Of 403",
            correo: "transcalituristico@gmail.com"
        }
    ]
    );

    return (
        <div className="h-full w-full">
            <h2 className="text-5xl text-principalTransparente text-center py-6">
                Directorio agremiaciones
            </h2>

            <div className="px-16">
                <table className="table w-full border border-gray-300" style={{ borderCollapse: "collapse", tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="border border-gray-300">
                            <th className="border border-gray-300 w-1/4">NOMBRE</th>
                            <th className="border border-gray-300 w-1/4">CONTACTO</th>
                            <th className="border border-gray-300 w-1/4">DIRECCIÓN</th>
                            <th className="border border-gray-300 w-1/4">CORREO</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll block" style={{ height: '500px', overflowY: 'scroll', width:"93.2vw" }}>
                        {optsTabla.map((col: any, indx: number) => (
                            <tr key={indx} className="border border-gray-300" style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}>
                                <td className="border border-gray-300 w-1/4">{col.nombre}</td>
                                <td className="border border-gray-300 w-1/4">{col.contacto}</td>
                                <td className="border border-gray-300 w-1/4">{col.direccion}</td>
                                <td className="border border-gray-300 w-1/4">{col.correo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}