import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import React, { useEffect } from "react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Captcha func
  const [tryCount, setTryCount] = React.useState(0);
  const [captchaCode, setCaptchaCode] = React.useState("");
  const generarCodigo = () => {
    const letra = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const numeros = Math.floor(1000 + Math.random() * 9000);
    return letra + numeros.toString();
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:4000/auth", data);
      console.log("Response:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/";
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Invalid credentials"
      ) {
        setTryCount(tryCount + 1);
        setCaptchaCode(generarCodigo());
        toast(
          (t) => (
            <div style={{ color: "#fff" }}>
              <strong>Error!</strong>
              <p>Wrong credentials.</p>
            </div>
          ),
          {
            style: {
              backgroundColor: "red",
              color: "#fff",
            },
            icon: "❌",
            duration: 3000,
          }
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  //View password func
  const [viewPass, setViewPass] = React.useState(false);
  const showHidePass = () => {
    setViewPass(!viewPass);
  };

  //Confirm captcha
  const [typeCapt, setTypeCapt] = React.useState("");
  const captchaValidate = () => {
    if (typeCapt === captchaCode) {
      setTryCount(0);
    } else {
      toast(
        (t) => (
          <div style={{ color: "#fff" }}>
            <strong>Error!</strong>
            <p>The captcha doesn't match</p>
          </div>
        ),
        {
          style: {
            backgroundColor: "red",
            color: "#fff",
          },
          icon: "❌",
          duration: 3000,
        }
      );
    }
  };

  const [userInfo, setUserInfo] = React.useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("userData", userData);

    if (userData) {
      setUserInfo(JSON.parse(userData));
      console.log("userInfo", userInfo);

    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form w-full h-full">
      <div className="h-full w-full flex flex-col justify-center items-center gap-y-6">
        {tryCount < 3 ? (
          <>
            <div className="w-10/12">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                className="shadow appearance-none border rounded-br20 w-full py-2 px-3 text-gray-700 bg-transparent leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  Email is required.
                </p>
              )}
            </div>

            <div className="w-10/12 mb-4">
              <label className="block text-gray-700 text-sm font-bold">
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  {...register("password", { required: true })}
                  className="shadow appearance-none border rounded-br20 w-full py-2 px-3 text-gray-700 bg-transparent leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={viewPass ? "text" : "password"}
                  placeholder="******************"
                />
                <div
                  style={{ position: "absolute", top: "30%", right: "5%" }}
                  onClick={showHidePass}
                >
                  {viewPass ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  Password is required.
                </p>
              )}
            </div>

            <button
              type="submit"
              className=" bg-principal w-10/12 text-white font-semibold py-2 px-4 border border-principal-500 rounded-br20"
            >
              Entrar
            </button>
            {userInfo &&(
              <button
                className=" bg-principal w-10/12 text-white font-semibold py-2 px-4 border border-principal-500 rounded-br20"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </button>
            )}
          </>
        ) : (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Ops! You have entered your credentials incorrectly 3 times</p>
              <br />
              <p>Captcha:</p>
              <div className="bg-blue-500 font-semibold text-white py-2 px-4  w-2/3 border border-transparent rounded">
                <p>{captchaCode}</p>
              </div>
              <br />
              <input
                type="text"
                onChange={(e: any) => setTypeCapt(e.target.value)}
                placeholder="Type the captcha"
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <br />

              <button
                type="button"
                onClick={captchaValidate}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
