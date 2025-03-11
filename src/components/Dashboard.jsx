import { useState, useEffect } from "react";
import { 
  Loader2, 
  Home, 
  Users, 
  MessageSquare, 
  Settings, 
  Plus, 
  Menu, 
  X,
  Mail,
  Phone,
  Building2,
  MapPin,
  Trash2
} from "lucide-react";

function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    cidade: ""
  });
  const [camposComErro, setCamposComErro] = useState({});

  // Fecha o menu em telas pequenas quando mudar para uma tela maior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // 768px é o breakpoint md do Tailwind
        setMenuAberto(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        const usuariosFormatados = dados.map(usuario => ({
          id: usuario.id,
          nome: usuario.name,
          email: usuario.email,
          telefone: usuario.phone,
          empresa: usuario.company.name,
          cidade: usuario.address.city
        }));
        setUsuarios(usuariosFormatados);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setErro("Não foi possível carregar os usuários. Tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    };

    buscarUsuarios();
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const abrirModal = () => {
    setModalAberto(true);
    setCamposComErro({});
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNovoUsuario({
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      cidade: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario({
      ...novoUsuario,
      [name]: value
    });
    
    if (camposComErro[name]) {
      setCamposComErro({
        ...camposComErro,
        [name]: false
      });
    }
  };

  const validarFormulario = () => {
    const erros = {};
    
    if (!novoUsuario.nome.trim()) {
      erros.nome = "Nome é obrigatório";
    }
    
    if (!novoUsuario.email.trim()) {
      erros.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoUsuario.email)) {
      erros.email = "Email inválido";
    }
    
    if (!novoUsuario.telefone.trim()) {
      erros.telefone = "Telefone é obrigatório";
    }
    
    if (!novoUsuario.empresa.trim()) {
      erros.empresa = "Empresa é obrigatória";
    }

    if (!novoUsuario.cidade.trim()) {
      erros.cidade = "Cidade é obrigatória";
    }
    
    setCamposComErro(erros);
    return Object.keys(erros).length === 0;
  };

  const adicionarUsuario = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }
    
    const novoId = Math.max(...usuarios.map(u => u.id), 0) + 1;
    const usuarioParaAdicionar = {
      id: novoId,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      telefone: novoUsuario.telefone,
      empresa: novoUsuario.empresa,
      cidade: novoUsuario.cidade
    };
    
    setUsuarios([...usuarios, usuarioParaAdicionar]);
    fecharModal();
    
    alert("Usuário adicionado com sucesso!");
  };

  const excluirUsuario = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    }
  };

  // Renderiza o card de usuário para telas pequenas
  const renderizarCardUsuario = (usuario) => (
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
  );

  return (
    <div className="w-full h-full flex relative">
      {/* Overlay para o menu em telas pequenas */}
      {menuAberto && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMenu}
          style={{ height: '100vh' }}
        />
      )}

      {/* Menu Lateral */}
      <aside 
        className={`
          absolute md:relative inset-y-0 left-0 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-30
          ${menuAberto ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 h-full
        `}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <button 
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                  <Home className="h-5 w-5 mr-2" />
                  Início
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 rounded bg-blue-600">
                  <Users className="h-5 w-5 mr-2" />
                  Usuários
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Mensagens
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                  <Settings className="h-5 w-5 mr-2" />
                  Configurações
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="mt-auto">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Dica rápida</h3>
              <p className="text-sm text-gray-300">
                Use o botão "Adicionar Usuário" para incluir novos registros.
              </p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Botão do menu e cabeçalho */}
        <div className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleMenu}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Lista de Usuários</h2>
          </div>
          <button
            onClick={abrirModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Adicionar Usuário</span>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-4 flex-1 overflow-auto">
          {carregando ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
          ) : erro ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p className="font-bold">Erro</p>
              <p>{erro}</p>
            </div>
          ) : (
            <>
              {/* Tabela para telas médias e grandes */}
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
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1">
                          <Phone size={16} className="text-gray-400" />
                          {usuario.telefone}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1">
                          <Building2 size={16} className="text-gray-400" />
                          {usuario.empresa}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1">
                          <MapPin size={16} className="text-gray-400" />
                          {usuario.cidade}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => excluirUsuario(usuario.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards para telas pequenas */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {usuarios.map(renderizarCardUsuario)}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Modal de Adicionar Usuário */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" onClick={fecharModal}></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform z-50 w-full max-w-md relative">
              <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Adicionar Novo Usuário</h3>
                <button onClick={fecharModal} className="text-white hover:text-gray-200">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={adicionarUsuario} className="p-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nome">
                    Nome*
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    value={novoUsuario.nome}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      camposComErro.nome ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  {camposComErro.nome && (
                    <p className="mt-1 text-sm text-red-600">{camposComErro.nome}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                    Email*
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={novoUsuario.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                        camposComErro.email ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                  </div>
                  {camposComErro.email && (
                    <p className="mt-1 text-sm text-red-600">{camposComErro.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="telefone">
                    Telefone*
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="telefone"
                      name="telefone"
                      type="text"
                      value={novoUsuario.telefone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                        camposComErro.telefone ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                  </div>
                  {camposComErro.telefone && (
                    <p className="mt-1 text-sm text-red-600">{camposComErro.telefone}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="empresa">
                    Empresa*
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      value={novoUsuario.empresa}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                        camposComErro.empresa ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                  </div>
                  {camposComErro.empresa && (
                    <p className="mt-1 text-sm text-red-600">{camposComErro.empresa}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="cidade">
                    Cidade*
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="cidade"
                      name="cidade"
                      type="text"
                      value={novoUsuario.cidade}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                        camposComErro.cidade ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                  </div>
                  {camposComErro.cidade && (
                    <p className="mt-1 text-sm text-red-600">{camposComErro.cidade}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={fecharModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <X size={20} />
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 