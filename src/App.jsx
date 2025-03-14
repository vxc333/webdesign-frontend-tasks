import { useState, lazy, Suspense } from "react";
import "./App.css";
import { CheckSquare, Users, LayoutDashboard } from "lucide-react";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy loading dos componentes
const ListaTarefas = lazy(() => import("./components/ListaTarefas"));
const ConsumidorAPI = lazy(() => import("./components/ConsumidorAPI"));
const Dashboard = lazy(() => import("./components/Dashboard"));

function App() {
  const [paginaAtual, setPaginaAtual] = useState("tarefas");

  const renderizarPagina = () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        {paginaAtual === "tarefas" && <ListaTarefas />}
        {paginaAtual === "usuarios" && <ConsumidorAPI />}
        {paginaAtual === "dashboard" && <Dashboard />}
      </Suspense>
    );
  };

  return (
    <div className="min-h-screen h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-3 shadow-md">
        <h1 className="text-2xl font-bold">Teste Técnico - ADTR</h1>
      </header>
      
      <nav className="bg-gray-100 p-2 border-b overflow-x-auto">
        <ul className="flex min-w-max space-x-2 px-1">
          <li>
            <button
              className={`px-3 py-2 rounded-md flex items-center gap-1 whitespace-nowrap text-sm sm:text-base sm:px-4 sm:gap-2 ${
                paginaAtual === "tarefas" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setPaginaAtual("tarefas")}
            >
              <CheckSquare size={18} />
              <span>Tarefa 1</span>
            </button>
          </li>
          <li>
            <button
              className={`px-3 py-2 rounded-md flex items-center gap-1 whitespace-nowrap text-sm sm:text-base sm:px-4 sm:gap-2 ${
                paginaAtual === "usuarios" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setPaginaAtual("usuarios")}
            >
              <Users size={18} />
              <span>Tarefa 2</span>
            </button>
          </li>
          <li>
            <button
              className={`px-3 py-2 rounded-md flex items-center gap-1 whitespace-nowrap text-sm sm:text-base sm:px-4 sm:gap-2 ${
                paginaAtual === "dashboard" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setPaginaAtual("dashboard")}
            >
              <LayoutDashboard size={18} />
              <span>Tarefa 3</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <main className="flex-1 overflow-auto bg-gray-50">
        {renderizarPagina()}
      </main>
      
      <footer className="bg-gray-800 text-white p-2 text-center text-sm">
        <p>Desenvolvido com React e Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
