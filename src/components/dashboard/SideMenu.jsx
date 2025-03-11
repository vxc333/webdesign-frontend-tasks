import { Home, Users, MessageSquare, Settings, X } from "lucide-react";

function SideMenu({ menuAberto, toggleMenu }) {
  return (
    <>
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
    </>
  );
}

export default SideMenu; 