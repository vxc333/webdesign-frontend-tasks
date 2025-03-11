import { RefreshCcw } from "lucide-react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="w-full p-4">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <p className="font-bold">Erro</p>
        <p>{message}</p>
      </div>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <RefreshCcw size={20} />
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export default ErrorMessage; 