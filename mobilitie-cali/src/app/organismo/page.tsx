"use client";
import { Topbar } from "@/components/topbar/Topbar";
import { CreateOrUpdatePage, Page } from "@/domain/models";
import FindStadisticsUseCase from "@/domain/usecases/news/find-stadistics.use.case";
import UpdateStadisticsUseCase from "@/domain/usecases/news/update-stadistics.use.case";
import { appContainer, USECASES_TYPES } from "@/infrastructure/ioc";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaPrint,
  FaTwitter,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa"; // Usa fa en lugar de fa6
import "./Organismo.css";

const Organismo = () => {
  // ==================== USE CASES ====================
  const findStadisticsUseCase = appContainer.get<FindStadisticsUseCase>(
    USECASES_TYPES._FindStadisticsUseCase
  );
  const updateStadisticsUseCase = appContainer.get<UpdateStadisticsUseCase>(
    USECASES_TYPES._UpdateStadisticsUseCase
  );
  // ==================== USE STATES ====================
  const [mounted, setMounted] = useState<boolean>(false);
  const [stadistics, setStadistics] = useState<Page>();

  const getStadistics = async () => {
    const stadisticsResponse = await findStadisticsUseCase.execute("organismo");

    if (stadisticsResponse) {
      setStadistics(stadisticsResponse);
    }
  };

  const init = async () => {
    // ==================== UPDATE STADISTICS ====================
    const updateData: CreateOrUpdatePage = {
      title: "organismo",
      views: 1,
      updatedAt: new Date(),
    };

    const update = await updateStadisticsUseCase.execute(updateData);
    // ==================== FIND STADISTICS ====================
    await getStadistics();
  };
  useEffect(() => {
    if (mounted) {
      init();
    }
  }, [mounted]);
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getStadistics();
    }, 30000); // 10000 milisegundos = 30 segundos

    // Función de limpieza para detener el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date: Date) => {
    const dateParsed = new Date(date);
    const day = dateParsed.getDate();
    const month = dateParsed.getMonth() + 1;
    const year = dateParsed.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [isSpeaking, setIsSpeaking] = useState(false);

  const text =
    "Sobre el organismo. El sector Administrativo de la Movilidad está integrado tanto por la Secretaría de Movilidad, como por la Secretaría de Infraestructura. Este sector tiene la misión de garantizar la planeación, gestión, ordenamiento, control, desarrollo armónico y sostenible de la ciudad en los aspectos de tránsito, transporte, seguridad e infraestructura vial y de transporte, en sus distintas modalidades. Por su parte, la Secretaría de Movilidad tiene como propósito garantizar mejores condiciones en la movilidad de personas y bienes en el área urbana y rural, dando prioridad a la movilidad no motorizada (peatón y bicicleta) y al transporte público optimizado sobre el transporte privado, en el marco de criterios de sostenibilidad ambiental y socio-económica, seguridad vial y accesibilidad universal. (Decreto 516 de 2016) La Secretaría de Movilidad tiene la siguiente estructura: 1.Despacho del Secretario.2.bsecretaría de Movilidad Sostenible y Seguridad Vial.3.Subsecretaría de Servicios de Movilidad.4.Oficina de Contravenciones.5.Unidad de Apoyo a la Gestión. Funciones de las subsecretarías y oficinas: Subsecretaría de Movilidad Sostenible y Seguridad Vial 1. Estructurar, ejecutar y hacer seguimiento a los Planes de Acción relacionados con accesibilidad universal, transporte no motorizado, transporte de pasajeros en todas sus modalidades, y transporte de mercancías. 2. Planear y ejecutar todos los aspectos relacionados con la implementación y utilización de dispositivos de regulación del tránsito, e implementar tecnologías aplicadas a la gestión inteligente de la movilidad en todos sus componentes. 3. Aprobar los Planes de Manejo de Tránsito y verificar su correcta implementación. 4. Planear y ejecutar todos los aspectos relacionados con la implementación y utilización de la señalización, demarcación y semaforización del Municipio.  5. Elaborar los estudios técnicos, formular las estrategias, planes y programas en materia de seguridad vial, con el propósito de reducir la accidentalidad, la contaminación ambiental y promover el mejoramiento del tránsito. 6. Elaborar los estudios técnicos y los documentos técnicos de soporte para la implementación de normas y medidas para la regulación y la optimización del tránsito y transporte en el Municipio. 7. Diseñar, presupuestar y ejecutar los proyectos de ingeniería de tránsito, transporte y seguridad vial que se requieran en la red vial del Municipio. 8. Planear y ejecutar todos los aspectos relacionados con la implementación y utilización de la Política de estacionamiento del Municipio. 9. Formular e implementar ordenamientos viales mediante la reglamentación de sentidos viales, utilización de carriles, velocidad de operación, señalización vertical y horizontal, semaforización, reglamentación de tránsito de los diversos tipos de vehículos, estacionamientos, de cargue y descargue de mercancías, vías peatonales, terminales de carga y pasajeros, y terminales y paraderos de buses. 10. Elaborar los estudios técnicos, económicos y jurídicos para los proyectos objetos de contratación que sean responsabilidad de la Subsecretaría en cumplimiento de las metas fijadas en el Plan de Desarrollo Municipal. 11. Desarrollar las demás funciones y negocios que le sean asignados acordes con su competencia. Subsecretaría de Servicios de Movilidad 1. Ejercer el control y vigilancia para que los usuarios del Sistema de Infraestructura Vial y de Transporte cumplan con las normas de tránsito y transporte vigentes. 2. Controlar el Transporte Público Urbano, Rural, intermunicipal de Pasajeros, carga y mixto conforme las competencias de la administración municipal. 3. Realizar el Registro Único Nacional de Transito conforme a la normatividad vigente. 4. Implementar estrategias para la apropiación de tecnologías de la información y comunicaciones (TIC) en materia de transporte y tránsito, en articulación y coordinación con las políticas municipales y nacionales, en coordinación con el Departamento Administrativo de Tecnologías de la Información y las Comunicaciones. 5. Implementar, integrar y mantener recursos tecnológicos para el control de la operación. 6. Implementar medidas para regulación y control de tránsito para eventos especiales en las vías públicas. 7. Elaborar los estudios técnicos, económicos y jurídicos para los proyectos objetos de contratación que sean responsabilidad de la Subsecretaría en cumplimiento de las metas fijadas en el Plan de Desarrollo Municipal. 8. Desarrollar las demás funciones y negocios que le sean asignadas acordes con su competencia. Oficina de Contravenciones 1. Asesorar y proferir criterios jurídicos en materia de interpretación de las normas de transporte y tránsito en concordancia con los lineamientos que rigen sobre la Alcaldía de Santiago de Cali 35 2. Controlar, vigilar y realizar el seguimiento a la aplicación de las normas y políticas en los procedimientos jurídicos de tránsito y transporte y recuperación de cartera por infracciones de tránsito y de transporte. 3. Adelantar el procedimiento de cobro persuasivo y coactivo de las multas de tránsito y de transporte, de conformidad con la ley. 4. Custodiar los expedientes de cobro, garantizando su seguridad, especialmente la de los documentos generadores de la obligación. 5. Resolver procesos que se adelantan por vulneración a las normas de tránsito. 6. Realizar y hacer seguimiento al registro de infractores en el Sistema Integrado de Información sobre Multas y Sanciones por Infracciones de Tránsito - SIMIT. 7. Proyectar los actos administrativos para la implementación de las normas y medidas para la regulación y la optimización del tránsito y el transporte, con sustento en los estudios técnicos respectivos. 8. Adelantar los procesos administrativos sancionatorios en materia de transporte público de conformidad con las normas. 9. Elaborar los estudios previos para adelantar los procesos contractuales a cargo del organismo. 10. Ejercer las funciones de inspecciones de tránsito conforme al Código Nacional de Tránsito y otras disposiciones de orden nacional, departamental o municipal, según sea el caso. 11. Adelantar las actuaciones encaminadas a lograr el cobro efectivo de las sumas que le adeuden a la Secretaría, con las excepciones legales, desarrollando las labores de cobro persuasivo y adelantando los procesos de jurisdicción coactiva en las condiciones que señale la ley. 12. Realizar la defensa judicial y extrajudicial de la Secretaría, según los lineamientos impartidos por el Departamento Administrativo de Gestión Jurídica Pública. 13. Desarrollar las demás funciones y negocios que le sean asignadas acordes con su competencia.";

  const handleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="container-organismo">
      <Topbar />
      <div className="infoPrincipal-organismo">
        <h1 className="title-organismo">Sobre el organismo</h1>
        <div className="pgel">
          <p>
            El sector Administrativo de la Movilidad está integrado tanto por la
            Secretaría de Movilidad, como por la Secretaría de Infraestructura.
            Este sector tiene la misión de garantizar la planeación, gestión,
            ordenamiento, control, desarrollo armónico y sostenible de la ciudad
            en los aspectos de tránsito, transporte, seguridad e infraestructura
            vial y de transporte, en sus distintas modalidades.
          </p>
          <br />
          <p>
            Por su parte, la Secretaría de Movilidad tiene como propósito
            garantizar mejores condiciones en la movilidad de personas y bienes
            en el área urbana y rural, dando prioridad a la movilidad no
            motorizada (peatón y bicicleta) y al transporte público optimizado
            sobre el transporte privado, en el marco de criterios de
            sostenibilidad ambiental y socio-económica, seguridad vial y
            accesibilidad universal. (Decreto 516 de 2016)
          </p>

          <p className="pgel-text">
            {" "}
            <strong>
              {" "}
              La Secretaría de Movilidad tiene la siguiente estructura:{" "}
            </strong>{" "}
          </p>

          <ol className="pgel-ol">
            <li> 1.Despacho del Secretario.</li>
            <li> 2.bsecretaría de Movilidad Sostenible y Seguridad Vial.</li>
            <li> 3.Subsecretaría de Servicios de Movilidad.</li>
            <li> 4.Oficina de Contravenciones.</li>
            <li> 5.Unidad de Apoyo a la Gestión.</li>
          </ol>

          <h1 className="title-funciones">
            Funciones de las subsecretarías y oficinas:
          </h1>

          <h2 className="title-subsecretaria">
            Subsecretaría de Movilidad Sostenible y Seguridad Vial
          </h2>

          <p className="pgel-img">
            <img
              className="img-demarcacion"
              src="https://previmoto.com.co/wp-content/uploads/2019/03/thpub_700X400_146249.jpg"
              alt="Demarcación vial"
            />
            <img
              className="img-reparacion"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExQVFhUXGRsaGRgYFx0dHRgaHxggGBoYHR8YHSkiHh0lHR0aITEiJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lHyUtLS0yLy0wLS0tLy0tLS0tLS0tLS0tLS0tLS0vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMwA9wMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xABFEAACAQIEAwUFBgMFBwQDAAABAhEAAwQSITEFQVEGEyJhcTKBkaGxI0JSwdHwFHLhB2KCkvEWJDM0U7LCFaKz0lRjc//EABoBAAIDAQEAAAAAAAAAAAAAAAIDAAEEBQb/xAAyEQACAgEDAgMHAwMFAAAAAAAAAQIRAxIhMQRBEzJRImFxgaHB8AWx0SMzkRQVQ1Lh/9oADAMBAAIRAxEAPwDoDdtcHMB2Y+Vtv/ICoLnbizpltXjJiYUD5MfpXMRjGnws2bfwhZ5zt5c6iTiZaId2P4c5HyFFsVuzquG7aWzcKXbbWl08c5hr+LQEeutMgvrlDggqYIIIIg852jnPQVxG0xJy93Egic0kE7Hbyo7wril3D+wwKN7Vt9Uad9Nx7qq4hrHP0Op2rqsJVgwmJBnXppW9A+EdocO1tVnu2AAyETsPu5R4h6fAVdbjVkfeY+iN+YqUwLL9ZQe92ksrErcgkAEgDU6AasNSdKtJxizlDM6pP3XYAj51KZLRer2hZ7RYQGP4i1P8357VXvcdwxu2wL6EQ2zmC0plnLodM2+lSmSw3WV7XlUWZWVlZUIZWVlZUIZWVlZUIK3bxQVsTt3hB9CNflSB/aBbCY+8FAA8EACAPs16V0HtxqtlY0Lkz6CPz+Vcr7QcTfEXjdfKGYLOXaQoH5UOD+7P4L7l5fJH5j92IucRuXQ2IN1bABPjABY7AQwzRrMjpvT6K47wXjWPv3wFulXIPiutlQDQzlYZemyzrXWOFrcFpBddbjx4nUAAmeQHLl7qbNARZarKysoAjKysrKhDKysrS7dC7/Ab1CG9ZVeziGb7mUeba/BQR86sTULaoysqBsWkxnWRykflXlXTL0v0OVYLhKWRdK7kEDyEUmcAQm42vs/rXQsQNGpA4G0Xro8z/wBxoX5WXi86GXCt41/mH1q1EqPQfSqVp4ZTOzD6iiAMgUlcG9+Yr3EI1Hvqw/GrgUTdYAQCMqkx1kjX6+tasKu8KwVu6txHHtQJ2Imdj19RHpTccndGfqIR06jzC3XumDccqehjzG0VHhcOLrNLF8pA8RJIIEEa67zVXEYe7hn+zukkajMN1/C3XYwQfTerfAeI2ySrQtxiTHIksWgHnvEHpT1K3RjcGkn6nl7hhklVPlUGHwZW4GdYVTPIzqBG9Mjr5VCU1EgRI+oq7BoIcF41/D5bV5ptNIR/+ntCsfw678o6bN1JOP4crKw6yfQ1r2f7Q/w62rd4numBAY72yDsf7n09Ngcb4LTHisrAZ1GorKAMysrKyoQysrKyoQWe2+gst0ZhMaagHflt+4rkPFMO1u4yurKejCDB2OvXf312Lt5/y09Li/Qihz9iLWJ7u/fu3WcpbzAFQpAA8MBZ20mZpeOWnNL4L7hTV418X9jnqcUTEX1fFZipIzlBBICwANQNQAK7RwVbYsW+6Rkt5RlVgQwHnJJn1qrg+zli3fbEKG7wiNTIAgAQI00AE0Xp8pWLSoysrKygCMrS/eVBmchQOZoR2o4w2HQLbE3HmJ2Uc2PygfpSVatEmSSx5sxJ+E0Ep1sben6N5I6m6QY4p2kuuWyFlQTCoJdh1J3E9FiOpqvh+MXwg9kNGocbecjn1HwmoAgUQKkTBBx4xKnl156+Xlz570MckkdB4ccVVGzcdxvJlE9Any0HzoVxDiN+GN65dgAkhTAIHLw6SeU0cyChvF8MptXmgSVj4DTfSZJqPI+xIQgnskejiFzKFwyiyo5kmT6n2p9y9PXKupaA0AAFZQtthaY+gJloOvloPXrSlaxatdKZAGBIzaagH0mnR03rndkf75c9WPzH6057xZwsfnQwMvruKKqYkc5M/E0JBFGzGs9T9aQuDoS8y/PQgY0S4EPGR5r9apZJIA1nT8qucJum1dZQFbyIJBhgNxqvrTMbqSE51eNoqYpNR6fmTVXD4FbyOzqRdVrkMDMhVzwwO4ImDuJ50R4kyFhlVl0mGII6aMNxp0rbhi6N5m787Apq3kzO/JEh4NxPL9ncLEEgKTrHkedG33pVRYYeo+tNt4b1ISvkrPBRewSdetA+NYEGzIHsyR5bz6j9+rIyzVK9a8JHWfqaNMQVeCcTbC5UclrJiOZtnTbmUPTly6FyRwQCCCCJBGxHIik+/akCORB+YNWewuZRdtliVUgqp+7LODHkYB6fOqku5cX2GmvK9rKAM8rKysqEF7t4P90byZfrFFeCmcPZP/60/wC0UN7cD/c7nqn/AHrV7s6Zwtj/APmv0ikr+6/h9xn/AB/M145xq3hEV7gYqzBZUTE845j01q9hr4uKrrOVhIkEGPRgCPfSd21wt65etpbW68vacBGK5cveBiHIK2z7Gp5034NCqIpzSFE5mzGY1lvvHzp/YV3Jq0vuQrFRmIBIWYkxoJ5TW9a3UzKV2kEfERVFo5r3tzEOb10+1sBpprAjp6/1rzE44WUL3NFBiV9dBHU1dxPZjF2ySkXBP3WA+TR8BNJfal2Z+7c5ckrlOnj3Y9NBp6zWdRk3R355sUceqMl8F/AQwHa+0zw6EL92GBLGYAIMc/X4Vfu9sbAAOW9qYnKu/wDm86Q7llVvWlQ5wHTXaSYJA8pkD0qzjbUsMskZmMAbQF/X51JrTJJCMWbXBykt1X1Ge525sja3cO34Rp8TVTG9s1K5O6IDCZz8pnbL+dJUSnPNCyI8h+/fUt5CbYYkSjMpjYgmRU0u0Tx9nt7/AK7jsvbaQSLHi6Z5+9H4fSspLwD5LgLbGJ85U/mBXtKm5xdJWbMXhZI25U/zc6EeMWZI7xT6a/Sk27g7gxTvkbKZgxvtyokMCFGcJtru361Zu2HK5iAfXX6k1rtHn4xp3ZXvoyqCykA0aS74iCDPTc9eXqKGX8Mcu6A6aSvXXSKv4DBjf+Itho08SmJI+7HuoVG+Bry1uye4OcED+leZSrDceExy6bV7jbAS2xGJFxoiAq/HQctaVMVxjEAlDcbSNjG4zDketXFNS3Blk1RGTOWuHX7gO3mdT/WtrXFu57xASZJMwIHhC7Nz5SI0+FCrGBvFVdrrQcug31O2nrV+zwm64bunGZcpOcBs2Zep18vhV6lqbBr2VEmIpqvDegKYQd0pdGV5I8LZiddzpBG2vSKvW8PiWMteCW53KID9Wk/vShhkUW0Fli50xpXYVEw0/fWhFy+qwv8AF3CdtUUa7QMoH1qCxduKAuIYczmF1llZMEBEHlu3rG1MU77CHCgu6QJrOzfFF7y+hUjKVAK+LODJkBQToSRQx8fhF1OUkc4DN8SSag4Pxmxh79+8veN3wTwhAoXKI3J1mrb2IoP0Y8/xhPs27h/whf8A5CprM907Ii+rkn4Ksf8AupXudvkG1i58VqPFdpcUWGQWUVlzDOrMYid1YDShW4TTXKHCyr652U9MqlY+LGflUk0Jw3F1ZLTM9sMVBcAxEjfqNjpM61W4lxC2VcC8hZkyhc+5I2EHeZ+NXQJL2zWcHe9F/wDkWpuyzThLP8v0JFV+0mHW3groXRAs6sTHiDSCx2/frv2NuhsHaIMiG1Hk7Uqv6t+77h3/AE/mX8Q2W9aP4g6e+M4+St8a8uXyL6pplKEzzkGqnFCziw4zW8t9NDuQSUII5AhvgaAdqcVdXE+G46woAykjcSdvWplzLGm2XDG5ukO0V4hkSNRXNWxN1t7t0+tx/wBajTDjp5/1rG/1GHaJoXSP1OmPcUbsB6kVxvtlaCYm6YDo1wv3m+UqCY01IzEj3A0dTCjoPhQftTiVUpaaAsFz5keyunvY/wAvlR4OteXIoKP1/wDAcnTrHHU2KeGvBLoDkCMrwQM2kNBjY76VDjMb4EMy03FbL1MAR8iPSrXDMQme49yCHK5pjQZiYnl4dJ9KgtWFVh3dlndgSubMFRtvu7mOnNwNIrdKCcrFQyyjCvUpJcdVIZHIBOm0Exoek6V7cJXDyIKkgQYkMDJMHcfr61eNyy57oWQA3NjDAgEx4tOXM8x6VmHsAWyFVGlhCOADbOXMX1kHTLt09amkniMEi9mCBTlG7a84InymTpWUxdoO7UAA22ysYAQbtqZGv9MorKqvQjlXmHkYAFMsiSpMTr6/vrVk8OHdkeXTpVg8Vw0g5wTBEgEmDEjbyHwrX/1yzGhY6clNV7HqTw8v/V/4IX4FaMsUltNfcBzqv/stbCnKXzaRJESCDrC+VX242kaJcP8AhH61riONBbZcoyj7uaNfQDkOtHGUfUCeLIlbQv43hfco3e3UGYGAATuIHSB8T60pX7JN06TCqYA6KB9dKahYuXS1y4E8Q8Be4oyT97LuWjYaR67QYfg+Uue9TxRrJEAHNoVB9/upUskNXJph02Vx4JsHph0neEBB9QDvRHgSgPcYkjQH3CelDb/DrbXTca+QTBK25gx6qPrW38Utt4VpUsFzOQJkZjMesc9qDVGV0yS6fJjScl3Dl+8uX2g6rM7SRB0kbdNaVMfxu7ckzlA5A9dPhEaVd4tw6/cdVsglXW4GCvIJKFV9rYecxttvUg4Fh0UPib+pHsWoY5hvrJG/TTzpePHo47gt77gXB4nXVvlP0FMPegiycS4t2FJaHZUa4I+6GOYLMGefpQ58TatlTZs7c7pzSeTFVgAjpr76G4u2t1md0Vmb2iWuSZ31z0y6K3Y7YfjOHuo+HstbymPtQsDLEs1zwgSI0IJnfSlnEYa+byDD3Betkw0Wgo3PsliSx256k7UPtW7RAQgqsyyMSUeNgxAzBQdYgzpJpixfGhZTVQC3PQyOWUA+KTtHStfT4o5FyZ82WWPsU3snqo9WWjYJKWwRMAQfVIP7HQVV4P3OLvhHJXRmYg+L36ETmI5c6mscTsjw95CKxRWeIYDQQRz8oq/9NOMmluSXVY5xV7HnE8PntDQHUHX3j86oYXA5SrAKsMCDG0GZorxDE93aNwiVB0giDJ3B6VT4bxDv1YhYy85B16HY8ukVVsBpMYsFbZsHjQ+ozPlUkmFygwJ2XpFF+x3/ACqiIhmHuzUMw5YYXF+La0xAjT2Dr8qk/s1xLXMEC5lu8cHSOh5etLd6vcXCtJd7ScQ7u2CwEi9byqGkwHDZj0BykbHl7kjiXaazebvW+zkkEFlJ0AXrMaHcD0pj7U4DurrYjRhe7tCpEEFAzzIOoIXKQeRPLZGwWCVLiKwVzdDHVQQhZhECRO41J/SkZsccicX7vuaen1Ka+ZI3aSz93O38qz9KnwfFWdlHcXEViQGfTXKWj5VLbwyiJfKCAdIAiJMZp0jQec1WJK37C58yzyaRm7tg2g2lp+NZJdJjjBv3M33Js2xPFbyGMi+s+ZH5UE41fa6QXCyVywDoYMwfUFv2KK8cYLdg5NVG+b8R/DQy62YQuUmfuhpkKW+8PKK09Nigoxmlu0jnZsk3NxvawXwzCeAhmVQbxDZhmGoeF6zpANTCzdtXcxdVXVA0SF8jA89zO1XcNaZLNwXWh7jZss6g+I+I66+LagSYy5fu5RCwYPJVEwSf1860qUW2k+BmTpsuKEZzVKXAf4Hwi5bYqb1t1a4iEZcwYMhgnxDTlr1qraXdXyMRlUm4DLMV/wCIDrLL7MaacxBrW/ireH1tEkFbbAI2zwBmPMaAaTuams4LNhngoRAuDMusrmAEzJnUTI09aj3ErarKGKwQcKB3SXG9lUM5QOuvTp11rKscNDswuOUQ2gYESHmFg5fZgevL1rKrjuR770Hv4y4Zgp6AR+VeW7lyID5R0GwHp8KCW+Gsx9pf8361c4d2fkZ7pAtruQQZP4RE6+fKsngW/MdNfqFR3hv/AI/n9w3h7JINy5dJtjTQxmP4Rr8TyodjOJrdeblxRGioCJA5acqqcXxV26oSyoVQIWCoCgdAx+dB+D9nbpebgI6E3FA1nU6meRjT1pqxxjFqzPPqpzyKTjxwuwcu4+yu7/X9KiPG8MNCWJ8ga3u9n2cQwUjydZHnvvUI7NKCTEag6Oo5RyNCunw1y7+Q2X6lnvhV8/5JH4/ZWPA/vAH1NEuC8VZ0a6kqubKQR7Kxm25gb+8UPPZ5SVDK2rAAlmgE7bGKJ2+GDDDLIlvEFBJg6DMZ9NPfRRwwim0Jn1uXI0n8eCfEY57mjnw8kgD0a4V5/wB0bdetLiOJUvmChTABAMjT129K1vXQAZMUIPELTXBbLhJ+8QT6DQGJ6mp7hbdu2SXL0nzNby4GiE+8frRlcNasgZoE/wB4NmnnI1I91DnfvNEQKp0knT9+lRoiZWbE5FzXFyjkNyfSKEY3jZuBQoChSSpPtCRBg8p/IVcXtFh7BhLfesD7ZIEkcwIPx3rfhuOwGKYpcRbDOZzkuQGJ3zKYE+axTsKWN6mhOZuapMm4TcOHwly+dHuHLb6xqAf+4/4RQrC8Qhg0eyuVR0H5TqSRqZot2x7PXcKihLrYjDgZg4GluTEEiRHQzz2E6qaXK348vdGKeMe+C8cXVbozK24mIPJhIOx6012eHqrQuQ5mdVcRqmsbGDqv6SDXILeIPpTHwLjbW3UuRCjZo1BmRJafco/Winjjld9wYyeNV2OqcKufZ4obAWzPqFYT8vfNUP7P+LFw2QlrZMQdIIKAsAddnWfd0oRxLi72wLljxW3BV15FbnhHLVl+Gp31jfsrbOFtEWgXhmJzanUIfujb7PoedcvIoLMr829fc3QUvCtcDD27vn7BIEF5nnorAj5iucWzcu9yU18IDZiZQZspCwN9OfQU79qeJLesWbugdc5aBK25HhZs0aCAevlS5wy2FLAbFnIPvOg+FTyzbfel+4OnWu+1vmvQHjD4xhpcyHqoA+ig9edS8I4LeW8Ll26WjXWd9pMzymmMRpFbFhGlNyRuDXuZcJPWm2/8sAcYwKXrzRiVBTwMFjSJP3gDzoXjGGEkJcF1iNSwDG3pEryDQTrVnjLmxe762ILqVkEgggTyBBkdRyPQQscRvM8tBnUli+Yk89GAiscMcppLDJtVx6fOtzrdPLDgbzdQlae3vfrRcOKzCOfM+Z1ms4VhbpN1ralmVTMEDUhgu+/Mach76pYLBHLmF1DMaHwkdRrNXA7WGtvIAY5c6EmB0IjmCSNKtdJnxy1OLo25v1PpeqwuHiJPfmy9gr117IlASxtwc6gMFIYEwZUyZ/xbVcx1m64zuqFrQZXRmIEd5kEQDPsHf8QNRcWx1m0hNhLigzn8RI38IkzAnNt0q1Y4j/EXMQGthD3SkrrJPeIxmQPxTEc62S2lR5yO8dQuYa/cVzbHcgXCW1WQV3VSYBgROnOvK8fEXLbKAQfBAkagTMSfQeVZVJqg3B26GThIN0d4fAik59QdtAun3jv5edDO1faDKAidIVeSjqepPzo5fz3kumygW3aBIVB94nQADcncnpXPLvCcU7E9zeJJ1Pdtr8qBRVgtsz/aDEfiHw/rWHtBiTpn+Q/Os/2dxf8A+Pe/yH9K8u8DxVsZnsXlUbko0AdTppV6Yk1SDvZniNy47d6SwCzpy1H4TTNYZdxptAMyJAOo660H/s+w5N4ncwIBiIkFiQeUT8q6lby/hX4Cr0R9CnNicl3qdAQdN9Dy896EcR4mXuO3Ikx6DQfKulFxyA+VcbxzZSy8wSD6gxQZNkkg8e7bZX4jjiTlB1+g615wewM+Y65QzH1Ckj5xVTE4RghuvKqRoY9roF66jfbetOHcZCowYRIVRG8E5mY/5QI86Tkxz07dx8MkFs+QjY4x3IVWQXMvJp1WdRIO4n6UQ4hj7mMi3ZtG2G0bbMw/CI9lY3P0FDLFlHZWMsCfCFiWO2k6D1O3Sjn+04sFltWbeQcxOY+bMSZ8tB6V0umwLSpzRg6rNUnGBd4T2PtWwO88TdBsPzPrNXrvC8DmIKWi4021HlPWhjdsFcZYKmNeUfDei/D+AMVGKJGYahZAIH4yJ33I6TO+25uCjuYam5BPhvY3EAEWZs23HiV2DW2HMG20mY5iKSOL9g7tpytq7YvRyDhSPL7Qgf8Auq63ax3dredu6WYknxEcz61a4Q966Az5Ap2B1PrE6e+lxwJ+06XwQcsslst/iI2Lwd20YuI6dJEA+h2PuqK28V1C1ehWtITeUn7TOqm3H94NofUajrQLF9l8PiMzYR0VwSDaZzkdulp2G/8AdYnlrQyxyhv2LjkjLbuCcDcN62bWveKC1uDqdNU89p9x60U7NPiS7qe9MqSCS+jDadzrr8qW173D3oYFLlthKkQQQdtfL4g12K1YtXgtwCC4BVl0OomdNwPPc1mzpOpGjE2vZ9BZu4DEdwuYPdc+0GVoZiYzECPCREgjatsDg7oKg23B8QiD5zHlzHkaZib6xkZLg1IBWGgbbEA6kH3iq1q/dF0XGSBlAE8hzOhPWffWZwTd/mw9TaVFB7F0EDurkdQhMdP2Jrf+FvEf8J9R+HbTamJbr6eK1y0k+nTpUqvpq6D/ABT+/wB7UTlsCkc07WF7du3mRll/vCJARp+opZ/h77Wu97sZHzZSdM2UeLKJ9abf7TXLvatoQxhogzqzKqz02Pxo1ieHYFrVrD32uxZGXwCBooGpgkzHLrTcGbF0uOMZOo7isuOfUZJSrfY5RgPbUNosmRHkSB8as45pKKPZJmPOAB9T8a6Nb4Dwca93iG5iGP6itMTwvhhjLYvGNpdvLo+lT/dOnjHn9v5KfQZpS2X7/wACN/6iAojeXU+hY/v3Gi2MxgS9cuDdrEH+burRA+P0NHH4Lw4ashReRfLEncCQTO5+NK2LtYZrjZbKuC5VSb513AMBuYApEM0ci1R4NLg4umDcTicxtNEyG0rKLWsJhCyhrKDeFa8dPL2t+f8AhNZQOS95pi5q2q337BDhVt7QOVjqZOgJ3gEyJOn51auX7s+0DP8AcUE+8Aa17aTXb3+m3u3qdEWTpzk6cyNxXBydblT5Zuj02OuCErcOveMP5YHxgVUx+Ov2SCLrFSCDmAYH+7qOk7760WKg+7/SgnGwRmMmMqxI0BLAEDzIn40zperyzyJSkDn6fGsbaRa7CXQL9wKAJzbDYTsNfL5U+NiY3/OkHsE698+eQAWEnNEyd4H08q6VhMAzkhHt5huMrBvXxgfGIr0DZx6KJuFtIY68p008qCt2Utm+95wYJkBoyg8ycxOad9RpPOmHF2btr2w5HIhrYHpAZT8aR+NYm7cv5cPZdmgjWCIBhpkld9PFr0jc1sy90DP7SyrJbC3FcqWkCBAgbGAGEiIFc5bSuonscbrNcul2Yn2ZMKNDkOROmghhpHv1wfZLCG4Q6gMjSFJbbTKrLcPruCCN6OrBtIS8I5VR+LLlH90c/edfjW46V5fjM+UQMxA8hJgfCsu6EjzrfF0jFJNshxForqDqNQaOYjtVcu2lQGCVh25sf05x1oE+aN5FUbdzK2WlylTsbGNqmErTeIRyFGzi0tCHZnYj/ho0R/Ow2/lEn0patPGtW8MAKbGb4QuUEtw1ieJ3b4FoQiCBkTRffOp99NOC4faa5Ys3EL20X2A0ZmJEcxJOpiR66UnYLEpaYXHlo1CD7x5SeS1YtY4Xrz372yLmCg6ZgYUe4mfdTb7Cq7j72j7LfxCzbsLZuKAFJuz4RsjDLoOhBMemlZ2LZzY7u4WR7bsmXwyAMrHcGdTy01HrS7wLtdbEnE2luN/1HBb0mZ8xAgHTYgybsdq8PoxRbSNKqcpGkjMRrGXzj6RWXJilKNL8+o6GRKW/59Bp7rTRjpoNvhsOelbiwdlIECBKk6e5h0qNXWQABoJ9BsPz+Fbo8lo125+p5etc82HgsmBEARHsn3D2qxbJ5wYEH9wf2TW6nTzBPPnMj8q8dweRjnr+nT9ahYKxfBbd1xcMMyhcvj5qSVO0TLHeeWlBsYCLjBtwYOx+gAPwFOOwHT12/p50ocWuRfuT+Kud+pJvGvia+j87Igpre3rFRi9Xlu4K4Ol0dM141YDWGHikEFSsbzpM8uRpTt8JIM9TPs+fvroPBiGuBWAIM6ETy8/Oid/hljmgHpm/8a7/AOmbYWn6v7HL6v8AufI5e3D2YiSvv3+YrK6MeB2W1UsPf+omsro7GaxVt3NT615cxwUKSG8W0Cfp1qO1YkSS3iBkTtO8Hf51YtnYHYR11/WvKz06t9zvRutiPF4tss/8M6SXAIiDvB66cqDcQzn2wftMkEGFBgSsa8j8qZnOmkUrcSW4rhXcsCQwnbUxHrpWroWpSpJL8/O4jqk1G3bCA4peSe6tEAHdSVB8zLgfKp7XFMWxCooUk/jS375SfjSJjcU5uElidTz86ifEljJ+pP1Nd7Sq7nJt2dZwD3FYtiL6XDEZc+usHV3eT8APlSdxi45v3HsFlDNOXOFJmNNTB8UmNTrtSoTWgYkxRJFWMC4nFBmDAlp1GXNv4eQ0Mj41LieIMlkrMXWlcwiFEiQI3bcSdvPepOE27aAIrKLx9udGI37tCdI0AIBkyd4pXZ/GwUHLmJE8vIz+9KdpcHuL1KS2CFmXEk8tf3yr0GT8PpFQYNjr5iPmP61ZyVpxu1YjIqdGFRyoViUi4PfRa5A0oZjjqDUycExmuaIqwt2qbNrW6NvS1IY0WRc1k1YzQADzMn8h++tVsNpJ+FbqZ3psWLkrLvfoY0J6KdBPXTeirYlbtwC4neQoWFORUUDlA9TFA7G5PSjPBAATPQ69J09+9aYNszTpcHQ+Ccat5QjN3bBUgOR4hGUamNRG3nPOidvH2xmPeoZM7jTQLGp8qTUZmxWUA90VVXIG0DMDptrR3+GXUFyw1hTAjqf6/Sub1WLRO1wzZgnqjvyGrOLSSQ6mTOhG0AdfKtlvAEiREyPf/WaXGsLOwPOGRdD/AJSeu5nU1SxfZlW8anuyZJKFtTG2pKjXX3VmNFDhbuDUaR/rIjpSbx1ovXI6/kKEDhGNR2KXBoJXM+rAnLCgTqNTEgc6nxaspAcktAkncnLudT9azdTHVFD8D0yNbd88qkt4nWqI0raxuYBPWBsOprnSxo3Rmxk4DiPt09/zU01XH9fUbUiJcZEZ1MMqkg9CKpWe1OI9nMDA3IB5Vs6JpQa95k6pNyTOigid9PUH6VlINvtXekAhCNd1rK3GWj3VhA0PX97zUFrEvyho0aBGvUeUVAOICSJ2286xEDEMrQBGn1rz0sel+0jrqd+Vkq45rmzZQJ0ER033n3RQ3GX2ZlSZCtpz9JPkKlxF4LO3i2A5VTsEZhy1HrvXUw4IpJ6aZiyZZN8i/etEuQBrJ+tSrw15iBO8c46/vrR6xwu6CzpbZpYxAmRm09mTERy3o3bwd/d8O0uTqcoOXz1EHoDW4zChhuBM2pZVFSGycMrBkGdmi22kkDXMOg2Px6U8NgXUlHsWWbcMbzAhZ00tqcoHvGh12lax+GW62riZGttJGXpncKFkRqYB086KE1GSZPCcosA3tNJDDSCRvrGbqJO0+XWr2DwtnIGuhpJ0iSAOQIXTl1nXaja9lrl1ndctm22VcrsRCgDw6QTJAI1IPWme32I0C6SBoQIPnMsQQfT36U/N1TyIVi6eMGIb4a0tssgAgjcmWBmCA2sD86H76k6DenntPwNcNYlwAWMLlA1O5J56D8utIj2/KF5fr60eFtwAypKZimTPwofxHceVEBQ/iI8IPKd/OP8AWin5QY8lLNrVhPnVW3V/B2516UqG4yRPEACpEFeqlTpbArTGNiJSo3s29Kv4G8quCdYoeG86kQRWiLrgyyTHfgfFrZLcnJ+OkCDTNwLumuMLhXNoylo1HMa6cvKuXYDE5DP7FOXCMUrrlJBPKeZqsuNZI0THNwlZ0RsLbaNF9TE+ZlRVPEYVRAXKJmQVOo6x091B9RYBsMbLFocKBGoJBiDl23WPOaG/8vad8xe6WEs7AsRIECBoNY15+tcWacG0+x1oe3Vdw9cwSKCpAKcwSAJ5Rpp106+6lvtD2fsGHtYnu3cA5HIynlImBIGhE0W4fx0Nla4pZdvBJzCNdAdCJGnOiPE+CcPxQQtaL6eGC4AkyZy7dd+u1K1xfA2WOUeTk2J4big2QGy5PS7bB+bD6VueH4xP+JbIkgLlIbOdSB4Ca6ZZ7G8MJ+zUiASTncwBzAeR+kVR4nwLDLdwyWu/yM5zMCSMuQ5WQkQJOkipJJki6Yo2LGLZSrWxaB8P2kqGJ5SZ1qne4HiwCP4fMf7jq2noDt610bF9mFVGa03e21DFg/tiBJhhA9xUHzob2Q7OWb1hCL2W8y+IQ0kBjEHMJERsKkYKLqKLctStsRbfB8WN8Nd+A/X96VldTPYy6PZxDe9mHl51lM+Qs5Vd7O25lbt0AnTxA+7Ub1IvZNjr/E3EnqoO48iJplfG2yDC3BBO3P8AzQI8tKG4lblxlCI2Ua6nUyNotkHTfejaQCYOs9k8xIOLZ4GwQ6evi0o72c7BslxL/esApzL4RLDY+0do5kc6l4RwK7biVW2BqQQ1wnWZO0c/aEa+ehjHYAKCcViSVJJVDI5z7C77TEAClykkNUbCl3illWKhszD7qSxmNoHOPPYVV4vfR1Hf5bVgcrsS58kJnkdDrr5UHvdqLdtQuFtZVmAwAMabxsNI189jSdx/i9xDIuBmaPa8bDWQZOgg67eWtApJ8BrG+494e7309xZK2xveuiPXKkR7z8K3udn7DgPdY3I2dmIAn8Kg5fkP15nhu1mMAAF9hGg0XbptVfEdosU5lrzEjbQafKmRTAntsdNPD8Cs63f7zDMZ8zI/KKrX7eTSxeeDqCJB9OnLy91c5PHsTzuHaD4V/SrPEuNYpLgQOfClsHwr7RQM3LqY91GwEtmx2/j7KsyYky7QxNxc0jXnBgeW2/nXj4Th1zX7D3XI+jCkLE4u7cVHutmOoGgEL7gJ1moQ8+RrZFeyjK+R9vYDhyAn7Lb/AKpPyzUl9t8dZfu0sABV10XKCdtoHxqswIoVjmzNpyqTXslx5K1ujGDteGhlu1rU6YsqdNqHG1HkKSb4C4SsNaLeDLIrVL1a9SM2lkoFbFq1DVqx1q26B02yzbNXMPfKHQmhyVILhq3lUVbBWJyew+9n+K94O7JgnKCfOdDvqav8asZrFxQ4LDKxEeMqDOb+UbztpSHwu/kbOTCry6nkPj9K6LfxSuEnILbrDFx4YK7EyMw10g7+lcvqXreprk6WCKhsuwncM4o1pyNVUkZgDsRzHnp7/fTVg7txQSrXCjAkw7akmJEkAnSCpI391JePwgsu1t5zptGzoT4DB9wNFOE8YNlLouhnt9Row2AjXrMwRXMrTKjqalONj9xMo1rP/FXijS2UiQYMvbItAHaR7UD1iJ7nEbdq4iAg2wVAyi2vdaBfGXfMCBI0XYkHWuc4ftyUJyLdAI3JUkn8R2k++rtr+0R7Z0zAEyfs08R6nWSfOZp2uuTN4V8fn0HfjmOcZsNatq1y7auEHvBJMkEAXCG69RHlQvAYpUwdlL9nRAq95tkMTJYeemnOJoLb/tJElsqhjEnuRrG0kPJjl0rB/aBalyVJzbxmHKOR8hruOR5UWvuL8N1Q7W72ItKGWL9ogESYcA7eKYYedZStZ/tItHKGQjKNIzAbRy30617R+KgPBkEBw+wIC2gTPSdeh5cudWb9+zY3Cq34V1bboNvfFLGO7SuwK2vs05ZNz7+fy2oE+KGVs7AtIAkhRLdSdztoqk0tzkxqxpcjLi+0zaraUJz8MSTtqwHh16DSlBbt27LPnzamVMloMALElpGh0yg6yKGY/EqjFSCWGkFYQH+U6vvu2h/DWqcNxLmWJDPvmYBsu05TqoGoAEe6qfvDjH0NVb7Vu+m3mEQGAnQxqNBqdSYGnPkRfgBZXQgK24VWzEmPbuPBkTI3Aq1wvg9i37ZzMNSDbzMRzK2yCflM9aar17D2LYZwASJVF1MaicpP1098ihvfYZsluctv8Hv21ZwgdF9pkIKj3jSfLehNzFQfZI9aeuM8fu4g5VHd2gdVEjnoDO/wA50kcRHjPrT4ZG9jPkxq7R7gLoe6iEQCfEeigZmP+UGo7/FC7tcIILEt6SZipcAkC63S0QPViq/Qmh9mwWIUbkx8dKJNtgyVRX5+dw4tyUVtdRsa1Gu9Wr5tqohwYEQPLSao3L8bV0ZeztZhj7W9GuKvFRrV7i2GtpZsgDLdCy5MyS2sGRpGwH+tA793XXWN62x2ONz7zZQSVUkws8gOVBrVOwtLtGpvaGokE1vZsaSdqs27QGopOq3QzTSJFeNKnQE1XUnpVu055iK0w94qRtmgVspqFm1qe0DzpidsBrYkU1YsWp1OgHM1UuYhE31PQVFcxmf2iQOgqpaXyVHUuC3evSQAPANtd/OuiYO+6LhogFrSZQFlvZytEg65VUjTnyiuYWnUmBJ0O+nkPM6kbV0LsbimVrYuhvs80Efez7AncCRt/LppWPqpbKKNPTx3bGHG8KW7a+0AtXmXMuxKsB9+5Hi6RNc0xEBWjUOYJLTlIO31rsV8gqrDbl11kiOlcs7b4VcPfZp8DnMAI3Ou3rm+PnWKUdRrxz07MXUfkakCFgY5edD7uNXfUe6s/wDUByfffQ/pRaF6F+JXct3lj/WsBiqT4xfxA/H9K1/iwR7VU4NlqaXcJJdg1lDUxIncfGvarwi/GQbxHE7jSLXgTU6DWCdddgKiw1i4sMlq49xtFbKSB5jQy2o8hPXZ1udlbJJXPdCEzkDDKCANQCD1Pxoxb4DaW0gBYBNAoIjUyZEazzmqcq2RSV7sR8H2cdAHuKpeZKuCQvTRYzNO41Gh6TRrDI+VmKhQJkuAir0Oh8J0mNZiNaPYrgaKgfNckDaQBG0eFQY99Zf7PWr5OdrkKTlUMABt5anzOvnS22w9hcPHFtIyWWLud7jLKrrqLatqdz4m9wqpbslvtLhZ3OpLHpoNtP0pws9isLAP2niGvi8vSvOIcAtW7YK5txz8/SonuDLcRsVof31pU4msXG8ia6Ne4Uj75htsfXqKqXOyFhyWLXJkbMOn8tHBaWU3aENDFpz+Iqv/AJn6L8a04Xhy9xVBgk79BEk+4Sa6Dd7GYcqBmuws/eXc7k+HyA91VsJ2Ws238L3NVK6ldiIMeHpT8dXuJyW1t6CQhIHi5SPhpUdxpE07Xey1kn2rnxX/AOtUMZ2btKsh7nxX/wCtNlmithaxtgHE8LUWVcOjMfbCuCUn2VYeX1PpQ2zYiJ1pmxeCRgixBQQGAAJHRoGvqddd6E3MEATBb5fpQa75LcfQ0vrpW7WTbhSPGY0/CN9fPyq5g7QVmO5RZWeR0E+6arMd23PU+tFj3kipbI9W5A1itGultqZ+xvBLN63fv3QXNoSqE+AmJ8QEE+kxQm7fF+3dY27SFNR3a5B7QEEDQinPPvpBWHayiLoA01PXlUL3GPOPSvSK9FPEkBWpGsOB7JjrBrfCWwbig7an4An4aVc4ljXg60ieXS6SGxx6o6mwZhbzd6gE+0pjqQdK7XwTgedSEdo1IYourbAqZMCR8vMzw/B+2DzmvoDs8Mlu3BJnQyZ+8NfU8/SseeTY/EqQvYnguKuqSuIZQzSbbCMpGmkDTbbLvPvXeOdlLwtKzXM6poYnnzA5cgfOulYoA4i6hUQpBGnN1LN8/rUaWFZCrCVJyxtpG2nrQxlaTI6OFY7hxUxMgaeh6VAvDjMbetdG4pwi23eqc2haDm18MxM6Hakx0gAawY91OF0DH4Z51D/BR5+VOtngto2wxBJI5sfyitbmDWVC+ET92BOnPSrIJS4RgfZNZTqMOk+yKyoVZ//Z"
              alt="reparación semaforos "
            />
          </p>

          <div className="subsecretarias">
            <p>
              1. Estructurar, ejecutar y hacer seguimiento a los Planes de
              Acción relacionados con accesibilidad universal, transporte no
              motorizado, transporte de pasajeros en todas sus modalidades, y
              transporte de mercancías.
            </p>

            <p>
              2. Planear y ejecutar todos los aspectos relacionados con la
              implementación y utilización de dispositivos de regulación del
              tránsito, e implementar tecnologías aplicadas a la gestión
              inteligente de la movilidad en todos sus componentes.
            </p>

            <p>
              3. Aprobar los Planes de Manejo de Tránsito y verificar su
              correcta implementación.
            </p>

            <p>
              4. Planear y ejecutar todos los aspectos relacionados con la
              implementación y utilización de la señalización, demarcación y
              semaforización del Municipio.
            </p>

            <p>
              5. Elaborar los estudios técnicos, formular las estrategias,
              planes y programas en materia de seguridad vial, con el propósito
              de reducir la accidentalidad, la contaminación ambiental y
              promover el mejoramiento del tránsito.
            </p>

            <p>
              6. Elaborar los estudios técnicos y los documentos técnicos de
              soporte para la implementación de normas y medidas para la
              regulación y la optimización del tránsito y transporte en el
              Municipio.
            </p>

            <p>
              7. Diseñar, presupuestar y ejecutar los proyectos de ingeniería de
              tránsito, transporte y seguridad vial que se requieran en la red
              vial del Municipio.
            </p>

            <p>
              8. Planear y ejecutar todos los aspectos relacionados con la
              implementación y utilización de la Política de estacionamiento del
              Municipio.
            </p>

            <p>
              9. Formular e implementar ordenamientos viales mediante la
              reglamentación de sentidos viales, utilización de carriles,
              velocidad de operación, señalización vertical y horizontal,
              semaforización, reglamentación de tránsito de los diversos tipos
              de vehículos, estacionamientos, de cargue y descargue de
              mercancías, vías peatonales, terminales de carga y pasajeros, y
              terminales y paraderos de buses.
            </p>

            <p>
              10. Elaborar los estudios técnicos, económicos y jurídicos para
              los proyectos objetos de contratación que sean responsabilidad de
              la Subsecretaría en cumplimiento de las metas fijadas en el Plan
              de Desarrollo Municipal.
            </p>

            <p>
              11. Desarrollar las demás funciones y negocios que le sean
              asignados acordes con su competencia.
            </p>

            <h2 className="title-subsecretaria">
              Subsecretaría de Servicios de Movilidad
            </h2>

            <h4 className="imgs-movilidad">
              <img
                className="img-regulacion"
                src="data:image/jpeg;base64,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"
                alt="regulación y control agentes "
              />

              <img
                className="img-control"
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </h4>

            <p>
              1. Ejercer el control y vigilancia para que los usuarios del
              Sistema de Infraestructura Vial y de Transporte cumplan con las
              normas de tránsito y transporte vigentes.
            </p>

            <p>
              2. Controlar el Transporte Público Urbano, Rural, intermunicipal
              de Pasajeros, carga y mixto conforme las competencias de la
              administración municipal.
            </p>

            <p>
              3. Realizar el Registro Único Nacional de Transito conforme a la
              normatividad vigente.
            </p>

            <p>
              4. Implementar estrategias para la apropiación de tecnologías de
              la información y comunicaciones (TIC) en materia de transporte y
              tránsito, en articulación y coordinación con las políticas
              municipales y nacionales, en coordinación con el Departamento
              Administrativo de Tecnologías de la Información y las
              Comunicaciones.
            </p>

            <p>
              5. Implementar, integrar y mantener recursos tecnológicos para el
              control de la operación.
            </p>

            <p>
              6. Implementar medidas para regulación y control de tránsito para
              eventos especiales en las vías públicas.
            </p>

            <p>
              7. Elaborar los estudios técnicos, económicos y jurídicos para los
              proyectos objetos de contratación que sean responsabilidad de la
              Subsecretaría en cumplimiento de las metas fijadas en el Plan de
              Desarrollo Municipal.
            </p>

            <p>
              8. Desarrollar las demás funciones y negocios que le sean
              asignadas acordes con su competencia.
            </p>

            <h2 className="title-subsecretaria">Oficina de Contravenciones</h2>

            <p>
              <img
                className="img-contravenciones"
                src="https://www.cali.gov.co/movilidad/publicaciones/117110/secretaria_de_transito_y_transporte_municipal/info/principal/media/galeria216374.jpg"
                alt=""
              />
            </p>

            <p>
              1. Asesorar y proferir criterios jurídicos en materia de
              interpretación de las normas de transporte y tránsito en
              concordancia con los lineamientos que rigen sobre la Alcaldía de
              Santiago de Cali 35
            </p>

            <p>
              2. Controlar, vigilar y realizar el seguimiento a la aplicación de
              las normas y políticas en los procedimientos jurídicos de tránsito
              y transporte y recuperación de cartera por infracciones de
              tránsito y de transporte.
            </p>

            <p>
              3. Adelantar el procedimiento de cobro persuasivo y coactivo de
              las multas de tránsito y de transporte, de conformidad con la ley.
            </p>

            <p>
              4. Custodiar los expedientes de cobro, garantizando su seguridad,
              especialmente la de los documentos generadores de la obligación.
            </p>

            <p>
              5. Resolver procesos que se adelantan por vulneración a las normas
              de tránsito.
            </p>

            <p>
              6. Realizar y hacer seguimiento al registro de infractores en el
              Sistema Integrado de Información sobre Multas y Sanciones por
              Infracciones de Tránsito - SIMIT.
            </p>

            <p>
              7. Proyectar los actos administrativos para la implementación de
              las normas y medidas para la regulación y la optimización del
              tránsito y el transporte, con sustento en los estudios técnicos
              respectivos.
            </p>

            <p>
              8. Adelantar los procesos administrativos sancionatorios en
              materia de transporte público de conformidad con las normas.
            </p>

            <p>
              9. Elaborar los estudios previos para adelantar los procesos
              contractuales a cargo del organismo.
            </p>

            <p>
              10. Ejercer las funciones de inspecciones de tránsito conforme al
              Código Nacional de Tránsito y otras disposiciones de orden
              nacional, departamental o municipal, según sea el caso.
            </p>

            <p>
              11. Adelantar las actuaciones encaminadas a lograr el cobro
              efectivo de las sumas que le adeuden a la Secretaría, con las
              excepciones legales, desarrollando las labores de cobro persuasivo
              y adelantando los procesos de jurisdicción coactiva en las
              condiciones que señale la ley.
            </p>

            <p>
              12. Realizar la defensa judicial y extrajudicial de la Secretaría,
              según los lineamientos impartidos por el Departamento
              Administrativo de Gestión Jurídica Pública.
            </p>

            <p>
              13. Desarrollar las demás funciones y negocios que le sean
              asignadas acordes con su competencia.
            </p>
          </div>
        </div>

        {stadistics && (
          <div className="info117110">
            <p>Número de visitas a esta página {stadistics.views.toString()}</p>
            <p>Fecha de publicación {formatDate(stadistics.createdAt)}</p>
            <p>Última modificación {formatDate(stadistics.updatedAt)}</p>
          </div>
        )}

        <div className="footer-share-options">
          <div className="contenedor-options-redes">
            <div>
              <button className="btn-share-options" onClick={handlePrint}>
                <FaPrint className="btn-options-icon" />
              </button>
              <button className="btn-share-options" onClick={handleSpeech}>
                {isSpeaking ? (
                  <FaVolumeMute className="btn-options-icon" />
                ) : (
                  <FaVolumeUp className="btn-options-icon" />
                )}
              </button>
            </div>

            <div className="flex">
              <p className="compartir">Compartir en:</p>
              <a href="https://www.facebook.com/sharer/sharer.php?u=http://www.cali.gov.co/movilidad/publicaciones/117110/secretaria_de_transito_y_transporte_municipal/">
                <button className="btn-share-options">
                  <FaFacebook className="btn-options-icon" />
                </button>
              </a>

              <a href="https://twitter.com/?status=http://www.cali.gov.co/movilidad/publicaciones/117110/secretaria_de_transito_y_transporte_municipal/">
                <button className="btn-share-options">
                  <FaTwitter className="btn-options-icon" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organismo;
