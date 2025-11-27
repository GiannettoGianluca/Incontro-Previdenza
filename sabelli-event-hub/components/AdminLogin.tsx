import React, { useState } from 'react';
import { Lock, ArrowRight, XCircle } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '1010') {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setCode('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full animate-fade-in border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Area Riservata</h2>
          <p className="text-gray-500 text-center text-sm mt-2">
            Inserisci il codice di sicurezza per accedere ai dati.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Codice Accesso</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              autoFocus
              className={`w-full px-4 py-3 text-center text-2xl tracking-widest border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                error 
                  ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                  : 'border-gray-300 focus:ring-gray-200 focus:border-gray-500'
              }`}
              placeholder="••••"
              value={code}
              onChange={(e) => {
                setError(false);
                setCode(e.target.value);
              }}
            />
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2 justify-center animate-pulse">
                <XCircle size={14} />
                <span>Codice errato. Riprova.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            Accedi
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={onCancel}
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    </div>
  );
};