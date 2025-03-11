import { useState } from "react";
import { Search, Mail, Phone, Globe, Building2, MapPin } from "lucide-react";
import { useUsuarios } from "../hooks/useUsuarios";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

function ConsumidorAPI() {
  const { usuarios, carregando, erro, buscarUsuarios, filtrarUsuarios } = useUsuarios();
  const [filtroPesquisa, setFiltroPesquisa] = useState("");

  const usuariosFiltrados = filtrarUsuarios(filtroPesquisa);

  if (carregando) {
    return <LoadingSpinner />;
  }

  if (erro) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          <ErrorMessage 
            message={erro} 
            onRetry={() => buscarUsuarios()} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Usuários da API</h2>
        
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={filtroPesquisa}
            onChange={(e) => setFiltroPesquisa(e.target.value)}
            placeholder="Pesquisar usuários..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {usuariosFiltrados.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            {filtroPesquisa ? "Nenhum usuário encontrado para esta pesquisa." : "Nenhum usuário disponível."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {usuariosFiltrados.map((usuario) => (
              <UsuarioCard key={usuario.id} usuario={usuario} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para o card de usuário
function UsuarioCard({ usuario }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <div className="p-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center mx-auto">
          <span className="text-2xl font-bold text-gray-600">
            {usuario.nome.charAt(0)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{usuario.nome}</h3>
        <p className="text-blue-600 text-center mb-4 flex items-center justify-center gap-1">
          <Mail size={16} />
          <a href={`mailto:${usuario.email}`} className="hover:underline">
            {usuario.email}
          </a>
        </p>
        <div className="border-t pt-4 space-y-2">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Phone size={16} className="text-gray-400" />
            <span>{usuario.telefone}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Globe size={16} className="text-gray-400" />
            <span>{usuario.website}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Building2 size={16} className="text-gray-400" />
            <span>{usuario.empresa}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span>{usuario.cidade}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConsumidorAPI; 