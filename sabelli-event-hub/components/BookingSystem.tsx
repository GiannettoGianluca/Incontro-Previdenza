import React, { useState } from 'react';
import { Clock, Check, User, Mail, PhoneCall, Send } from 'lucide-react';
import { dataService } from '../services/dataService';
import { Booking } from '../types';

interface BookingSystemProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ onComplete, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState('Mattina');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeOptions = [
    { label: 'Mattina', sub: '09:00 - 13:00' },
    { label: 'Pomeriggio', sub: '14:00 - 18:00' },
    { label: 'Sera', sub: '18:00 - 20:00' }
  ];

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || isSubmitting) return;

    setIsSubmitting(true);

    // Save locally for UI consistency
    const newBooking: Booking = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      time: preference,
      name: name,
      email: email,
      phone: "-", 
      submittedAt: new Date().toISOString()
    };
    dataService.saveBooking(newBooking);

    // Construct Email for the Agent
    const agentEmail = "info@sabelliassicurazioni.it"; // Sostituisci con la tua email reale
    const subject = encodeURIComponent(`Nuova Richiesta Consulenza - ${name}`);
    const body = encodeURIComponent(
`Gentile Consulente,

Vorrei richiedere una consulenza previdenziale gratuita come proposto durante l'evento.

--- Dati Cliente ---
Nome: ${name}
Email: ${email}
Preferenza Oraria: ${preference}

Attendo una vostra conferma.
Cordiali saluti.`
    );

    // Open Mail Client
    window.location.href = `mailto:${agentEmail}?subject=${subject}&body=${body}`;

    // Finish
    await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay to allow mail client to open
    setIsSubmitting(false);
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Sidebar Info */}
        <div className="bg-red-700 p-8 text-white md:w-1/3 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Consulenza Previdenziale</h2>
            <p className="text-red-100 mb-6">
              Compila il modulo per inviarci una richiesta ufficiale via email. Ti risponderemo in giornata per fissare l'orario definitivo.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-100">
                <Clock size={20} />
                <span>30 Minuti</span>
              </div>
              <div className="flex items-center gap-3 text-red-100">
                <User size={20} />
                <span>Consulenza 1-to-1</span>
              </div>
              <div className="flex items-center gap-3 text-red-100">
                <PhoneCall size={20} />
                <span>Ti chiamiamo noi</span>
              </div>
            </div>
          </div>
          <button onClick={onCancel} className="text-sm text-red-200 hover:text-white text-left mt-8 underline">
            Torna indietro
          </button>
        </div>

        {/* Form Only */}
        <div className="p-8 md:w-2/3 flex flex-col justify-center">
            <form onSubmit={handleBook} className="animate-fade-in flex flex-col h-full justify-center">
               <div className="mb-8">
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Prenota la tua consulenza</h3>
                 <p className="text-gray-500">Inserisci i tuoi dati. Cliccando su invia si aprirà la tua app di posta per confermare la richiesta.</p>
               </div>

               <div className="space-y-5 flex-grow">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome</label>
                   <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                       <User size={18} />
                     </div>
                     <input 
                        required
                        type="text"
                        placeholder="Mario Rossi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                     />
                   </div>
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                   <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                       <Mail size={18} />
                     </div>
                     <input 
                        required
                        type="email"
                        placeholder="mario@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                     />
                   </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fascia Oraria Preferita</label>
                    <div className="grid grid-cols-3 gap-3">
                        {timeOptions.map((opt) => (
                            <button
                                key={opt.label}
                                type="button"
                                onClick={() => setPreference(opt.label)}
                                className={`py-3 px-2 rounded-lg border text-center transition-all ${
                                    preference === opt.label 
                                    ? 'bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500' 
                                    : 'border-gray-200 text-gray-600 hover:border-red-200 hover:bg-gray-50'
                                }`}
                            >
                                <div className="font-semibold text-sm">{opt.label}</div>
                                <div className="text-xs opacity-75 mt-0.5">{opt.sub}</div>
                            </button>
                        ))}
                    </div>
                 </div>
               </div>

               <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-8 bg-gray-900 text-white py-4 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 font-bold text-lg shadow-lg disabled:opacity-70"
               >
                  {isSubmitting ? 'Apertura Email...' : 'Invia Richiesta via Email'}
                  {!isSubmitting && <Send size={20} />}
               </button>
            </form>
        </div>
      </div>
    </div>
  );
};