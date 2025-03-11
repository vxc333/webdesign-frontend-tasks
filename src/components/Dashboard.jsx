import { useState, useEffect } from "react";
import { Menu, Plus } from "lucide-react";
import { useUsuarios } from "../hooks/useUsuarios";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import SideMenu from "./dashboard/SideMenu";
import UsuarioForm from "./dashboard/UsuarioForm";
import UsuariosTable from "./dashboard/UsuariosTable";
import UsuariosCards from "./dashboard/UsuariosCards";

function Dashboard() {
  const { 
    usuarios, 
    carregando, 
    erro, 
    buscarUsuarios, 
    adicionarUsuario, 
    excluirUsuario 
  } = useUsuarios();
  
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

  const handleAdicionarUsuario = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }
    
    const sucesso = adicionarUsuario(novoUsuario);
    
    if (sucesso) {
      fecharModal();
      alert("Usuário adicionado com sucesso!");
    }
  };

  const handleExcluirUsuario = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      excluirUsuario(id);
    }
  };

  return (
    <div className="w-full h-full flex relative">
      <SideMenu menuAberto={menuAberto} toggleMenu={toggleMenu} />
      
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
            <h2 className="text-xl font-bold text-gray-800 truncate">Lista de Usuários</h2>
          </div>
          <button
            onClick={abrirModal}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm whitespace-nowrap ml-2"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Adicionar Usuário</span>
            <span className="sm:hidden">Adicionar</span>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-4 flex-1 overflow-auto">
          {carregando ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : erro ? (
            <ErrorMessage message={erro} onRetry={buscarUsuarios} />
          ) : (
            <>
              <UsuariosTable 
                usuarios={usuarios} 
                excluirUsuario={handleExcluirUsuario} 
              />
              
              <UsuariosCards 
                usuarios={usuarios} 
                excluirUsuario={handleExcluirUsuario} 
              />
            </>
          )}
        </div>
      </div>

      <UsuarioForm 
        modalAberto={modalAberto}
        fecharModal={fecharModal}
        novoUsuario={novoUsuario}
        handleInputChange={handleInputChange}
        adicionarUsuario={handleAdicionarUsuario}
        camposComErro={camposComErro}
      />
    </div>
  );
}

export default Dashboard; 