import { Loader2 } from "lucide-react";

function LoadingSpinner({ size = "large", className = "" }) {
  const sizeClass = size === "large" ? "w-12 h-12" : "w-6 h-6";
  
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Loader2 className={`${sizeClass} text-blue-500 animate-spin ${className}`} />
    </div>
  );
}

export default LoadingSpinner; 