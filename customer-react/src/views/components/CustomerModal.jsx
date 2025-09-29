import React from 'react';

export default function CustomerModal({ show, onClose, type, customer, backendErrors, onEditChange, onEditSubmit }) {
  if (!show || !customer) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative animate-slide-up">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl transition">&times;</button>
        {type === 'view' ? (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Detalle del Cliente</h3>
            <ul className="space-y-2">
              <li><b>ID:</b> {customer.id}</li>
              <li><b>Identificación:</b> {customer.identificacion}</li>
              <li><b>Tipo:</b> {customer.tipoIdentificacion|| ''}</li>
              <li><b>Nombre:</b> {customer.primerNombre} {customer.segundoNombre}</li>
              <li><b>Apellido:</b> {customer.primerApellido} {customer.segundoApellido}</li>
              <li><b>Email:</b> {customer.email}</li>
              <li><b>Dirección:</b> {customer.direccion}</li>
              <li><b>Teléfono:</b> {customer.telefono}</li>
              <li><b>Ocupación:</b> {customer.ocupacion}</li>
              <li><b>Fecha Nacimiento:</b> {customer.fechaNacimiento}</li>
              <li><b>Foto:</b> {customer.foto ? <img src={customer.foto} alt="foto" className="w-16 h-16 object-cover rounded-full" /> : 'Sin foto'}</li>
            </ul>
          </div>
        ) : (
          <form onSubmit={onEditSubmit} className="space-y-3" noValidate>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Editar Cliente</h3>
            {backendErrors && backendErrors.length > 0 && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
                <ul className="list-disc pl-5">
                  {backendErrors.map((err, i) => (
                    <li key={i}>{typeof err === 'string' ? err : (err.defaultMessage || JSON.stringify(err))}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={customer.identificacion || ''} onChange={e => onEditChange({ ...customer, identificacion: e.target.value })} placeholder="Identificación" required />
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg transition" value={typeof customer.primerNombre === 'string' ? customer.primerNombre : ''} onChange={e => onEditChange({ ...customer, primerNombre: e.target.value })} placeholder="Primer Nombre" required />
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg transition" value={customer.segundoNombre || ''} onChange={e => onEditChange({ ...customer, segundoNombre: e.target.value })} placeholder="Segundo Nombre" />
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg transition" value={customer.primerApellido || ''} onChange={e => onEditChange({ ...customer, primerApellido: e.target.value })} placeholder="Primer Apellido" required />
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg transition" value={customer.segundoApellido || ''} onChange={e => onEditChange({ ...customer, segundoApellido: e.target.value })} placeholder="Segundo Apellido" />
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={customer.direccion || ''} onChange={e => onEditChange({ ...customer, direccion: e.target.value })} placeholder="Dirección" />
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={customer.telefono || ''} onChange={e => onEditChange({ ...customer, telefono: e.target.value })} placeholder="Teléfono" />
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={customer.email || ''} onChange={e => onEditChange({ ...customer, email: e.target.value })} placeholder="Email" type="email" />
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={customer.ocupacion || ''} onChange={e => onEditChange({ ...customer, ocupacion: e.target.value })} placeholder="Ocupación" />
              <input className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-2 rounded-lg col-span-2 transition" value={customer.fechaNacimiento || ''} onChange={e => onEditChange({ ...customer, fechaNacimiento: e.target.value })} placeholder="Fecha de Nacimiento" type="date" />
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow">Guardar</button>
          </form>
        )}
      </div>
    </div>
  );
}
