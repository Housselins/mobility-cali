"use client";

import Link from "next/link";
import { useEffect, useState } from 'react';
import { Banner } from '../../components/banner/Banner'
import './dashboard.css';


const Dashboard = () => {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        setUser(user);

    }, []);

    return (
        <>
            <Banner />
        </>
    );
};

export default Dashboard;