import React from 'react';

export default function CustomerCreateModal({ show, onClose, newCustomer, onChange, onSubmit, createErrors }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative animate-slide-up">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl transition">&times;</button>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Crear Cliente</h3>
        {createErrors && createErrors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
            <ul className="list-disc pl-5">
              {createErrors.map((err, i) => (
                <li key={i}>{typeof err === 'string' ? err : (err.defaultMessage || JSON.stringify(err))}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-3" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={newCustomer.identificacion} onChange={e => onChange({ ...newCustomer, identificacion: e.target.value })} placeholder="Identificación" required />
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg transition" value={newCustomer.primerNombre} onChange={e => onChange({ ...newCustomer, primerNombre: e.target.value })} placeholder="Primer Nombre" required />
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg transition" value={newCustomer.segundoNombre} onChange={e => onChange({ ...newCustomer, segundoNombre: e.target.value })} placeholder="Segundo Nombre" />
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg transition" value={newCustomer.primerApellido} onChange={e => onChange({ ...newCustomer, primerApellido: e.target.value })} placeholder="Primer Apellido" required />
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg transition" value={newCustomer.segundoApellido} onChange={e => onChange({ ...newCustomer, segundoApellido: e.target.value })} placeholder="Segundo Apellido" />
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={newCustomer.direccion} onChange={e => onChange({ ...newCustomer, direccion: e.target.value })} placeholder="Dirección" />
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={newCustomer.telefono} onChange={e => onChange({ ...newCustomer, telefono: e.target.value })} placeholder="Teléfono" required />
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={newCustomer.email} onChange={e => onChange({ ...newCustomer, email: e.target.value })} placeholder="Email" type="email" required />
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={newCustomer.ocupacion} onChange={e => onChange({ ...newCustomer, ocupacion: e.target.value })} placeholder="Ocupación" />
            <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={newCustomer.fechaNacimiento} onChange={e => onChange({ ...newCustomer, fechaNacimiento: e.target.value })} placeholder="Fecha de Nacimiento" type="date" required />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow">Guardar</button>
        </form>
      </div>
    </div>
  );
}
