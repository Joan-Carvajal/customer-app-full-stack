import  { createRef } from 'react';
import clienteAxios from '../config/axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const loginRef = createRef();
  const claveRef = createRef();
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const datos = {
        login: loginRef.current.value,
        clave: claveRef.current.value,
      };
      await clienteAxios.post('/auth/register', datos);
      
      alert('Registro exitoso');
     navigate('/login');
    } catch (err) {
      alert('Error al registrar');
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-green-800">Crear Cuenta</h2>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              id="login"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              ref={loginRef}
              required
            />
          </div>
          <div>
            <label htmlFor="clave" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="clave"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              ref={claveRef}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Registrarse
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="font-medium text-green-700 hover:text-green-900">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;