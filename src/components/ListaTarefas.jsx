import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";

function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [erro, setErro] = useState("");
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

  const adicionarTarefa = (e) => {
    e.preventDefault();
    
    if (!novaTarefa.trim()) {
      setErro("Por favor, digite uma tarefa válida.");
      return;
    }
    
    const novaTarefaObj = {
      id: Date.now(),
      texto: novaTarefa.trim(),
      concluida: false,
      dataCriacao: new Date().toISOString()
    };
    
    setTarefas([...tarefas, novaTarefaObj]);
    setNovaTarefa("");
    setErro("");
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

  if (carregando) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Lista de Tarefas</h2>
        
        <form onSubmit={adicionarTarefa} className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              placeholder="Adicionar nova tarefa..."
              className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Adicionar
            </button>
          </div>
          {erro && <p className="text-red-500 mt-2">{erro}</p>}
        </form>
        
        <div className="overflow-y-auto max-h-[calc(100vh-300px)] space-y-3">
          {tarefas.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhuma tarefa adicionada ainda.</p>
          ) : (
            tarefas.map((tarefa) => (
              <div 
                key={tarefa.id} 
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  tarefa.concluida ? 'bg-green-50 border-green-200' : 'bg-white'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={tarefa.concluida}
                    onChange={() => alternarConclusao(tarefa.id)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p className={`${
                      tarefa.concluida ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}>
                      {tarefa.texto}
                    </p>
                    <p className="text-xs text-gray-500">
                      Criada em: {formatarData(tarefa.dataCriacao)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removerTarefa(tarefa.id)}
                  className="ml-2 text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
        
        {tarefas.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <p>Total: {tarefas.length} tarefa(s) | Concluídas: {tarefas.filter(t => t.concluida).length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaTarefas; 