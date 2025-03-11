import { X } from "lucide-react";

function UsuarioEditForm({ 
  modalAberto, 
  fecharModal, 
  usuario, 
  handleInputChange, 
  editarUsuario, 
  camposComErro 
}) {
  if (!modalAberto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Editar Usuário</h3>
          <button 
            onClick={fecharModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={editarUsuario} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={usuario.nome}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  camposComErro.nome ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {camposComErro.nome && (
                <p className="mt-1 text-sm text-red-600">{camposComErro.nome}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={usuario.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  camposComErro.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {camposComErro.email && (
                <p className="mt-1 text-sm text-red-600">{camposComErro.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={usuario.telefone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  camposComErro.telefone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {camposComErro.telefone && (
                <p className="mt-1 text-sm text-red-600">{camposComErro.telefone}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
                Empresa
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                value={usuario.empresa}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  camposComErro.empresa ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {camposComErro.empresa && (
                <p className="mt-1 text-sm text-red-600">{camposComErro.empresa}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={usuario.cidade}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  camposComErro.cidade ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {camposComErro.cidade && (
                <p className="mt-1 text-sm text-red-600">{camposComErro.cidade}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-2 sm:space-x-3 sm:gap-0">
            <button
              type="button"
              onClick={fecharModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto mt-2 sm:mt-0"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsuarioEditForm; 