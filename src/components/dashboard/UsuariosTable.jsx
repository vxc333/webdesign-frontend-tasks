import { Mail, Phone, Building2, MapPin, Trash2, Edit } from "lucide-react";

function UsuariosTable({ usuarios, excluirUsuario, editarUsuario }) {
  return (
    <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Informações
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {usuario.id}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="font-medium text-gray-900">{usuario.nome}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                <a href={`mailto:${usuario.email}`} className="hover:underline flex items-center gap-1">
                  <Mail size={16} />
                  {usuario.email}
                </a>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Phone size={16} className="text-gray-400" />
                    {usuario.telefone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 size={16} className="text-gray-400" />
                    {usuario.empresa}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-gray-400" />
                    {usuario.cidade}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => editarUsuario(usuario.id)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                    title="Editar usuário"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => excluirUsuario(usuario.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                    title="Excluir usuário"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosTable; 