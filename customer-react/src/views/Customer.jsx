
import React, { useState, useEffect } from 'react';
import {
  fetchCustomers,
  fetchCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '../services/customerService';
import CustomerTable from './components/CustomerTable';
import CustomerModal from './components/CustomerModal';
import CustomerCreateModal from './components/CustomerCreateModal';

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view'); 
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    identificacion: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    direccion: '',
    telefono: '',
    email: '',
    ocupacion: '',
    fechaNacimiento: '',
  });
  const [createErrors, setCreateErrors] = useState([]);
  
  const handleCreate = () => {
    setShowCreate(true);
    setCreateErrors([]);
    setNewCustomer({
      identificacion: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      direccion: '',
      telefono: '',
      email: '',
      ocupacion: '',
      fechaNacimiento: '',
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateErrors([]);
    try {
      let payload = { ...newCustomer };
      if (payload.fechaNacimiento) {
        payload.fechaNacimiento = payload.fechaNacimiento.slice(0, 10);
      }
      await createCustomer(payload);
      setShowCreate(false);
      setPage(0);
    } catch (err) {
      if (err.response && err.response.data) {
        if (Array.isArray(err.response.data)) {
          setCreateErrors(err.response.data.map(e => e.defaultMessage || JSON.stringify(e)));
        } else if (err.response.data.errors) {
          setCreateErrors(err.response.data.errors.map(e => e.defaultMessage || JSON.stringify(e)));
        } else if (err.response.data.message) {
          setCreateErrors([err.response.data.message]);
        } else if (typeof err.response.data === 'string') {
          setCreateErrors([err.response.data]);
        } else {
          setCreateErrors([JSON.stringify(err.response.data)]);
        }
      } else {
        setCreateErrors(['No se pudo crear el cliente: ' + err.message]);
      }
    }
  };

 
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers(page, 10);
        setCustomers(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('No se pudieron cargar los clientes: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, [page]);

  
  const handleView = async (id) => {
    try {
      const data = await fetchCustomerById(id);
      setSelectedCustomer(data);
      setModalType('view');
      setShowModal(true);
    } catch (err) {
      alert('No se pudo obtener el cliente ' + err.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const data = await fetchCustomerById(id);
      setSelectedCustomer(data);
      setModalType('edit');
      setShowModal(true);
    } catch (error) {
      setError(error?.response?.data?.errors ? Object.values(error.response.data.errors) : 'No se pudo obtener el cliente');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este cliente?')) return;
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      alert('Cliente eliminado');
    } catch (err) {
      alert('No se pudo eliminar el cliente ' + err.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const [backendErrors, setBackendErrors] = useState([]);
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setBackendErrors([]);
    try {
      let payload = { ...selectedCustomer };
      if (payload.fechaNacimiento) {
        if (typeof payload.fechaNacimiento === 'string') {
          payload.fechaNacimiento = payload.fechaNacimiento.slice(0, 10);
        } else if (payload.fechaNacimiento instanceof Date) {
          payload.fechaNacimiento = payload.fechaNacimiento.toISOString().slice(0, 10);
        }
      }
      await updateCustomer(selectedCustomer.id, payload);
      setShowModal(false);
      setSelectedCustomer(null);
      setPage(0);
    } catch (error) {
      if (error.response && error.response.data && Array.isArray(error.response.data)) {
        setBackendErrors(error.response.data.map(e => `${e.campo}: ${e.error}`));
      } else {
        setBackendErrors(['Error desconocido']);
      }
    }
  };

  if (loading) return <div className="p-8">Cargando clientes...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  
  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <div className="p-2 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 flex items-center gap-2">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Clientes
        </h2>
        <div className="flex gap-2">
          <button onClick={handleCreate} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg shadow font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Nuevo Cliente
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-900 transition text-white px-5 py-2 rounded-lg shadow font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" /></svg>
            Logout
          </button>
        </div>
      </div>

    
      <CustomerCreateModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        newCustomer={newCustomer}
        onChange={setNewCustomer}
        onSubmit={handleCreateSubmit}
        createErrors={createErrors}
      />

     
      <CustomerTable
        customers={customers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      
      <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-2">
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg font-semibold disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          &larr; Anterior
        </button>
        <span className="px-4 py-2 text-gray-700 font-medium">Página {page + 1} de {totalPages}</span>
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg font-semibold disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
        >
          Siguiente &rarr;
        </button>
      </div>

      
      <CustomerModal
        show={showModal}
        onClose={closeModal}
        type={modalType}
        customer={selectedCustomer}
        backendErrors={backendErrors}
        onEditChange={setSelectedCustomer}
        onEditSubmit={handleEditSubmit}
      />

      
 
    </div>
  );
}
