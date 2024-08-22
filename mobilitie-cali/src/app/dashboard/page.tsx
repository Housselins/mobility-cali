import Link from "next/link";
import React from "react";

const Dashboard = () => {

    return (
        <>
            <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100%'
            }}>
                <br />
                <h2>Login Succesfull</h2>
                <br />
                <Link href="/">Close session</Link>
            </div>
        </>
    );
}

export default Dashboard;
