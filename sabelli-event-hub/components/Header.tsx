import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="bg-red-700 p-2 rounded-lg text-white">
              <ShieldCheck size={28} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg leading-tight">Sabelli Consulenti</span>
              <span className="text-xs text-red-700 font-semibold tracking-wider">GENERALI ASSICURAZIONI</span>
            </div>
          </div>
          <button 
            onClick={onAdminClick}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Area Riservata
          </button>
        </div>
      </div>
    </header>
  );
};