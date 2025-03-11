import { Mail, Phone, Building2, MapPin, Trash2 } from "lucide-react";

function UsuariosCards({ usuarios, excluirUsuario }) {
  return (
    <div className="md:hidden grid grid-cols-1 gap-4">
      {usuarios.map((usuario) => (
        <div key={usuario.id} className="bg-white p-4 rounded-lg shadow-md space-y-3 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-900">{usuario.nome}</p>
              <a href={`mailto:${usuario.email}`} className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                <Mail size={14} />
                {usuario.email}
              </a>
            </div>
            <button
              onClick={() => excluirUsuario(usuario.id)}
              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-gray-400" />
              {usuario.telefone}
            </p>
            <p className="flex items-center gap-2">
              <Building2 size={14} className="text-gray-400" />
              {usuario.empresa}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-400" />
              {usuario.cidade}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsuariosCards; 