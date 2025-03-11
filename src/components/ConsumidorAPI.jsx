import { useState, useEffect } from "react";
import { Loader2, Search, RefreshCcw, Mail, Phone, Globe, Building2, MapPin } from "lucide-react";

function ConsumidorAPI() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroPesquisa, setFiltroPesquisa] = useState("");

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!resposta.ok) {
          throw new Error(`Erro na requisição: ${resposta.status}`);
        }
        
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setErro("Não foi possível carregar os usuários. Tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    };

    buscarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter(usuario => {
    const termoPesquisa = filtroPesquisa.toLowerCase();
    return (
      usuario.name.toLowerCase().includes(termoPesquisa) ||
      usuario.email.toLowerCase().includes(termoPesquisa) ||
      usuario.company.name.toLowerCase().includes(termoPesquisa)
    );
  });

  if (carregando) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (erro) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Erro</p>
            <p>{erro}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <RefreshCcw size={20} />
            Tentar novamente
          </button>
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
              <div key={usuario.id} className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="p-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-gray-600">
                      {usuario.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{usuario.name}</h3>
                  <p className="text-blue-600 text-center mb-4 flex items-center justify-center gap-1">
                    <Mail size={16} />
                    <a href={`mailto:${usuario.email}`} className="hover:underline">
                      {usuario.email}
                    </a>
                  </p>
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <span>{usuario.phone}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Globe size={16} className="text-gray-400" />
                      <span>{usuario.website}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Building2 size={16} className="text-gray-400" />
                      <span>{usuario.company.name}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{usuario.address.city}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsumidorAPI; 