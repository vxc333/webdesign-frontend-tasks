import { useState, useEffect } from "react";
import { Menu, Plus } from "lucide-react";
import { useUsuarios } from "../hooks/useUsuarios";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import SideMenu from "./dashboard/SideMenu";
import UsuarioForm from "./dashboard/UsuarioForm";
import UsuarioEditForm from "./dashboard/UsuarioEditForm";
import UsuariosTable from "./dashboard/UsuariosTable";
import UsuariosCards from "./dashboard/UsuariosCards";

function Dashboard() {
  const { 
    usuarios, 
    carregando, 
    erro, 
    buscarUsuarios, 
    adicionarUsuario, 
    editarUsuario,
    excluirUsuario 
  } = useUsuarios();
  
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    cidade: ""
  });
  const [usuarioEditando, setUsuarioEditando] = useState({
    id: null,
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

  const abrirModalEdicao = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
      setUsuarioEditando({...usuario});
      setUsuarioSelecionado(id);
      setModalEdicaoAberto(true);
      setCamposComErro({});
    }
  };

  const fecharModalEdicao = () => {
    setModalEdicaoAberto(false);
    setUsuarioEditando({
      id: null,
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      cidade: ""
    });
    setUsuarioSelecionado(null);
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

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditando({
      ...usuarioEditando,
      [name]: value
    });
    
    if (camposComErro[name]) {
      setCamposComErro({
        ...camposComErro,
        [name]: false
      });
    }
  };

  const validarFormulario = (usuario) => {
    const erros = {};
    
    if (!usuario.nome.trim()) {
      erros.nome = "Nome é obrigatório";
    }
    
    if (!usuario.email.trim()) {
      erros.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
      erros.email = "Email inválido";
    }
    
    if (!usuario.telefone.trim()) {
      erros.telefone = "Telefone é obrigatório";
    }
    
    if (!usuario.empresa.trim()) {
      erros.empresa = "Empresa é obrigatória";
    }

    if (!usuario.cidade.trim()) {
      erros.cidade = "Cidade é obrigatória";
    }
    
    setCamposComErro(erros);
    return Object.keys(erros).length === 0;
  };

  const handleAdicionarUsuario = (e) => {
    e.preventDefault();
    
    if (!validarFormulario(novoUsuario)) {
      return;
    }
    
    const sucesso = adicionarUsuario(novoUsuario);
    
    if (sucesso) {
      fecharModal();
      alert("Usuário adicionado com sucesso!");
    }
  };

  const handleEditarUsuario = (e) => {
    e.preventDefault();
    
    if (!validarFormulario(usuarioEditando)) {
      return;
    }
    
    const sucesso = editarUsuario(usuarioSelecionado, usuarioEditando);
    
    if (sucesso) {
      fecharModalEdicao();
      alert("Usuário atualizado com sucesso!");
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
                editarUsuario={abrirModalEdicao}
              />
              
              <UsuariosCards 
                usuarios={usuarios} 
                excluirUsuario={handleExcluirUsuario}
                editarUsuario={abrirModalEdicao}
              />
            </>
          )}
        </div>
      </div>

      {/* Modal de Adicionar Usuário */}
      <UsuarioForm 
        modalAberto={modalAberto}
        fecharModal={fecharModal}
        novoUsuario={novoUsuario}
        handleInputChange={handleInputChange}
        adicionarUsuario={handleAdicionarUsuario}
        camposComErro={camposComErro}
      />

      {/* Modal de Editar Usuário */}
      <UsuarioEditForm 
        modalAberto={modalEdicaoAberto}
        fecharModal={fecharModalEdicao}
        usuario={usuarioEditando}
        handleInputChange={handleEditInputChange}
        editarUsuario={handleEditarUsuario}
        camposComErro={camposComErro}
      />
    </div>
  );
}

export default Dashboard; 