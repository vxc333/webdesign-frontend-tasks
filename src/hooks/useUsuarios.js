import { useState, useEffect } from "react";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

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
        website: usuario.website,
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

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const adicionarUsuario = (novoUsuario) => {
    const novoId = Math.max(...usuarios.map(u => u.id), 0) + 1;
    const usuarioParaAdicionar = {
      id: novoId,
      ...novoUsuario
    };
    
    setUsuarios([...usuarios, usuarioParaAdicionar]);
    return true;
  };

  const excluirUsuario = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
  };

  const filtrarUsuarios = (termoPesquisa) => {
    if (!termoPesquisa) return usuarios;
    
    const termo = termoPesquisa.toLowerCase();
    return usuarios.filter(usuario => (
      usuario.nome.toLowerCase().includes(termo) ||
      usuario.email.toLowerCase().includes(termo) ||
      usuario.empresa.toLowerCase().includes(termo)
    ));
  };

  return {
    usuarios,
    carregando,
    erro,
    buscarUsuarios,
    adicionarUsuario,
    excluirUsuario,
    filtrarUsuarios
  };
} 