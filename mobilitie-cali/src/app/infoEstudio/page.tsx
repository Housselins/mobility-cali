"use client";
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { Topbar } from '@/components/topbar/Topbar';
import './InfoEstudio.css';

const InfoEstudio = () => {

    const searchParams = useSearchParams(); //se  Usa `useSearchParams` para obtener los parámetros de la URL
    //se obtiene el id del parámetro de la URL
    const id = searchParams.get("id");

    const [estudio, setEstudio] = useState<any | null>(null);

    useEffect(() => {
        if (id) {
            const getEstudio = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/estudios/${id}`);
                    console.log(response.data);
                    setEstudio(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            getEstudio();
        }
    }, [id]);



    return (
        <>
            <div className="container-estudios">
                <Topbar />
                {estudio && (
                    <div className="infoPrincipal-estudios">
                        <h1 className="title-estudios">{estudio.titulo}</h1>
                        <div className="pgel">
                            <p className="span-dirEntRel mb-4">{estudio.descripcion}</p>
                        </div>

                        <div className='fecha-estudio'>
                            <p className="span-dirEntRel mb-4"> Fecha de publicación {estudio.createdAt}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default InfoEstudio