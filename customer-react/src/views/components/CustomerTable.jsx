import React from 'react';

export default function CustomerTable({ customers, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 border">Foto</th>
            <th className="px-3 py-2 border">ID</th>
            <th className="px-3 py-2 border">Identificación</th>
            <th className="px-3 py-2 border">Tipo</th>
            <th className="px-3 py-2 border">Nombre</th>
            <th className="px-3 py-2 border">Apellido</th>
            <th className="px-3 py-2 border">Email</th>
            <th className="px-3 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-green-50 transition">
              <td className="px-3 py-2 border text-center">
                {c.foto ? (
                  <img src={c.foto} alt="foto" className="w-10 h-10 object-cover rounded-full mx-auto border border-gray-200 shadow-sm" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                )}
              </td>
              <td className="px-3 py-2 border">{c.id}</td>
              <td className="px-3 py-2 border">{c.identificacion}</td>
              <td className="px-3 py-2 border">{c.tipoIdentificacion || ''}</td>
              <td className="px-3 py-2 border">{c.primerNombre} {c.segundoNombre}</td>
              <td className="px-3 py-2 border">{c.primerApellido} {c.segundoApellido}</td>
              <td className="px-3 py-2 border">{c.email}</td>
              <td className="px-3 py-2 border flex flex-wrap gap-2 justify-center">
                <button onClick={() => onView(c.id)} className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 transition text-white px-2 py-1 rounded text-xs shadow">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Ver
                </button>
                <button onClick={() => onEdit(c.id)} className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 transition text-white px-2 py-1 rounded text-xs shadow">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Editar
                </button>
                <button onClick={() => onDelete(c.id)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 transition text-white px-2 py-1 rounded text-xs shadow">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
