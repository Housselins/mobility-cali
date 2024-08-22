'use client';
import LoginForm from "../components/forms/login"
import React from "react";
export default function Home() {

  const ocultarInitSesion = () => {
    console.log("Hola");
    
    setControladorRenderLogin(!controladorRenderLogin);
  };

  const [controladorRenderLogin, setControladorRenderLogin] = React.useState(false);

  return (
    <main>
      <div className="relative h-full w-full">
        <div className="absolute inset-x-0 top-0 h-10 flex px-5" style={{ backgroundColor: 'rgb(51, 102, 204)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>Top Bar</p>
          <button onClick={ocultarInitSesion}>
            iniciar sesión
          </button>
        </div>

        <div className="shadow-2xl fixed top-0 right-0 rounded" style={{ width: '25%', height: '50%', backgroundColor: 'white', display: controladorRenderLogin ? 'block' : 'none' }}>
          <LoginForm />
        </div>

        <div className="absolute inset-x-0 mt-10 h-34">
          <p>body</p>
        </div>
      </div>
    </main>
  );
}
