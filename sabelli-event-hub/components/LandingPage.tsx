import React from 'react';
import { ArrowRight, MessageSquare, CalendarCheck } from 'lucide-react';

interface LandingPageProps {
  onStartSurvey: () => void;
  onStartBooking: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartSurvey, onStartBooking }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-64 sm:h-80 bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=2600&auto=format&fit=crop" 
            alt="Famiglia felice in spiaggia" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 shadow-sm">
              Grazie per la splendida serata!
            </h1>
            <p className="text-gray-200 text-lg shadow-sm">
              Aperitivo e Previdenza - Ieri sera
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10 space-y-8">
          <div className="prose max-w-none text-gray-600">
            <p className="text-lg">
              Ciao <strong>Valued Guest</strong>,
            </p>
            <p>
              Grazie per aver partecipato ieri sera al nostro evento. È stato un vero piacere condividere con te e gli altri ospiti riflessioni importanti sulla <strong>serenità finanziaria</strong> e le <strong>opportunità previdenziali</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: Survey */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">La tua opinione conta</h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                Per migliorare i nostri prossimi incontri, ti chiedo 2 minuti per rispondere a 3 brevi domande.
              </p>
              <button 
                onClick={onStartSurvey}
                className="w-full py-3 px-4 bg-white border-2 border-blue-600 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 group"
              >
                Partecipa al Sondaggio
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2: Booking */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mb-4">
                <CalendarCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Approfondisci Gratis</h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                Come promesso, offro una consulenza personalizzata gratuita di 30 minuti per analizzare la tua situazione.
              </p>
              <button 
                onClick={onStartBooking}
                className="w-full py-3 px-4 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                Prenota Consulenza
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};