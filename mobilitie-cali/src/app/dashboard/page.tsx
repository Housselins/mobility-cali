"use client";

import Link from "next/link";
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        setUser(user);

    }, []);

    return (
        <div>
            {user ? <p>Welcome, {user.user.name}!</p> : <p>Loading...</p>}
            <br />
                <Link href="/">Close session</Link>
        </div>
    );
};

export default Dashboard;