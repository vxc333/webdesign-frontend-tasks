import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useTarefas } from "../hooks/useTarefas";
import LoadingSpinner from "./LoadingSpinner";

function ListaTarefas() {
  const { 
    tarefas, 
    carregando, 
    adicionarTarefa, 
    removerTarefa, 
    alternarConclusao, 
    formatarData,
    tarefasConcluidas,
    totalTarefas
  } = useTarefas();
  
  const [novaTarefa, setNovaTarefa] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!novaTarefa.trim()) {
      setErro("Por favor, digite uma tarefa válida.");
      return;
    }
    
    const sucesso = adicionarTarefa(novaTarefa);
    
    if (sucesso) {
      setNovaTarefa("");
      setErro("");
    }
  };

  if (carregando) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Lista de Tarefas</h2>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row">
            <input
              type="text"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              placeholder="Adicionar nova tarefa..."
              className="flex-1 px-4 py-2 border rounded-lg sm:rounded-r-none sm:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              <span>Adicionar</span>
            </button>
          </div>
          {erro && <p className="text-red-500 mt-2">{erro}</p>}
        </form>
        
        <div className="overflow-y-auto max-h-[calc(100vh-300px)] space-y-3">
          {tarefas.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhuma tarefa adicionada ainda.</p>
          ) : (
            tarefas.map((tarefa) => (
              <TarefaItem 
                key={tarefa.id} 
                tarefa={tarefa} 
                onToggle={alternarConclusao} 
                onRemove={removerTarefa} 
                formatarData={formatarData}
              />
            ))
          )}
        </div>
        
        {tarefas.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <p>Total: {totalTarefas} tarefa(s) | Concluídas: {tarefasConcluidas}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para cada item da tarefa
function TarefaItem({ tarefa, onToggle, onRemove, formatarData }) {
  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-lg ${
        tarefa.concluida ? 'bg-green-50 border-green-200' : 'bg-white'
      }`}
    >
      <div className="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={() => onToggle(tarefa.id)}
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
        onClick={() => onRemove(tarefa.id)}
        className="ml-2 text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}

export default ListaTarefas; 