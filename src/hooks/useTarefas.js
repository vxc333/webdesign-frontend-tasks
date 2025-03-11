import { useState, useEffect } from "react";

export function useTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      try {
        setTarefas(JSON.parse(tarefasSalvas));
      } catch (e) {
        console.error("Erro ao carregar tarefas:", e);
      }
    }
    setCarregando(false);
  }, []);

  // Salvar tarefas no localStorage quando mudar
  useEffect(() => {
    if (!carregando) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }, [tarefas, carregando]);

  const adicionarTarefa = (texto) => {
    if (!texto.trim()) {
      return false;
    }
    
    const novaTarefaObj = {
      id: Date.now(),
      texto: texto.trim(),
      concluida: false,
      dataCriacao: new Date().toISOString()
    };
    
    setTarefas([...tarefas, novaTarefaObj]);
    return true;
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  const alternarConclusao = (id) => {
    setTarefas(
      tarefas.map(tarefa => 
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return {
    tarefas,
    carregando,
    adicionarTarefa,
    removerTarefa,
    alternarConclusao,
    formatarData,
    tarefasConcluidas: tarefas.filter(t => t.concluida).length,
    totalTarefas: tarefas.length
  };
} 