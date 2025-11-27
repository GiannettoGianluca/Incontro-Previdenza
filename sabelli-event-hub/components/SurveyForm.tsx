import React, { useState } from 'react';
import { Star, ThumbsUp, ArrowRight, CheckCircle } from 'lucide-react';
import { SurveyResponse } from '../types';
import { dataService } from '../services/dataService';

interface SurveyFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [topic, setTopic] = useState('');
  const [interest, setInterest] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const response: SurveyResponse = {
      id: Date.now().toString(),
      rating,
      interestTopic: topic,
      futureInterest: interest || false,
      submittedAt: new Date().toISOString()
    };
    
    dataService.saveSurvey(response);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Domanda {step} di 3</span>
            <span>{Math.round((step / 3) * 100)}% Completato</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Come valuteresti l'evento di ieri sera?</h2>
            <div className="flex justify-center gap-4 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star 
                    size={48} 
                    className={`${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                disabled={rating === 0}
                onClick={() => setStep(2)}
                className="btn-primary flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                Avanti <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quale argomento ti ha interessato di più?</h2>
            <div className="space-y-3 mb-8">
              {['Pensione Integrativa', 'Protezione del Patrimonio', 'Investimenti Sicuri', 'Vantaggi Fiscali', 'Altro'].map((option) => (
                <button
                  key={option}
                  onClick={() => setTopic(option)}
                  className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all ${
                    topic === option 
                      ? 'border-blue-600 bg-blue-50 text-blue-800' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700">Indietro</button>
              <button
                disabled={!topic}
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
              >
                Avanti <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Parteciperesti a futuri eventi?</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setInterest(true)}
                className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  interest === true ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-green-200'
                }`}
              >
                <ThumbsUp size={32} />
                <span className="font-semibold">Sì, certamente</span>
              </button>
              <button
                onClick={() => setInterest(false)}
                className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  interest === false ? 'border-gray-400 bg-gray-100 text-gray-600' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xl font-bold">No</span>
                <span className="font-semibold">Non credo</span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-700">Indietro</button>
              <button
                disabled={interest === null || isSubmitting}
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg disabled:opacity-50 hover:bg-green-700 transition shadow-lg"
              >
                {isSubmitting ? 'Invio in corso...' : 'Invia Risposte'}
                {!isSubmitting && <CheckCircle size={18} />}
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
             <button onClick={onCancel} className="text-sm text-gray-400 hover:text-red-500">
                Annulla e torna alla home
             </button>
        </div>
      </div>
    </div>
  );
};