import { createRef } from "react";
import clienteAxios from "../config/axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const loginRef = createRef();
  const claveRef = createRef();
  const navigate = useNavigate();
  const handleLogin = async (e) => {

    try {
      
      e.preventDefault();
      const datos = {
        login: loginRef.current.value,
        clave: claveRef.current.value,
      };
      const  {data}  = await clienteAxios.post("/auth/login", datos);
      localStorage.setItem("token", data.token);
     console.log(data);
     navigate("/");
    } catch(err) {
     alert("El usuario no existe " + err.message);
     
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-blue-800">Iniciar Sesión</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Usuario</label>
              <input
                type="text"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="usuario@ejemplo.com"
                ref={loginRef}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ref={claveRef}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              
              <div className="text-sm">
                <Link to="/register" className="font-medium text-blue-700 hover:text-blue-900">
                  ¿No tienes cuenta?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
