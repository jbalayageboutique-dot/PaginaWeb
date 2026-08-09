import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA } from '../data/balayageData';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualConsultationModal: React.FC<QuizProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    currentColor: '',
    desiredGoal: '',
    hairLength: '',
    hairCondition: ''
  });

  if (!isOpen) return null;

  const currentStepMax = 3;

  const handleSelect = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < currentStepMax) {
      setStep(step + 1);
    } else {
      setStep(4); // Result screen
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const getRecommendation = () => {
    if (answers.desiredGoal.includes('Corregir')) {
      return {
        title: 'Servicio Recomendado: Corrección de Color & Balayage Correctivo',
        duration: '4.5 - 5.5 horas',
        description: 'Debido a tintes previos o manchas, se sugiere un diagnóstico previo con prueba de mechón y decoloración progresiva con tratamiento protector K18/Plex.'
      };
    }
    if (answers.desiredGoal.includes('Morena')) {
      return {
        title: 'Servicio Recomendado: Morena Iluminada Caramelo / Miel',
        duration: '3 - 3.5 horas',
        description: 'Ideal para aportar puntos de luz estratégicos en el rostro sin perder la elegancia de tu base oscura natural.'
      };
    }
    return {
      title: 'Servicio Recomendado: Balayage Master Signature',
      duration: '4 - 4.5 horas',
      description: 'Aclaración personalizada con técnica de esfumado de raíz, garantizando durabilidad de hasta 6 meses sinretoques semanales.'
    };
  };

  const recommendation = getRecommendation();

  const generateWhatsappMessage = () => {
    const text = `Hola! Realicé el Diagnóstico Capilar en la web:
- Color actual: ${answers.currentColor || 'No especificado'}
- Resultado deseado: ${answers.desiredGoal || 'No especificado'}
- Largo de cabello: ${answers.hairLength || 'No especificado'}

Me recomendó: *${recommendation.title}*. 
Quisiera consultar disponibilidad de turnos y presupuesto estimado.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#171717] text-white max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-[#2A2A2A] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-[#0F0F0F] text-white flex items-center justify-between border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#BFA181]" />
            <span className="font-serif text-lg font-normal">Diagnóstico Capilar Online</span>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white text-xl">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Progress Bar */}
          {step <= currentStepMax && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-stone-400 font-medium">
                <span>Paso {step} de {currentStepMax}</span>
                <span>{Math.round((step / currentStepMax) * 100)}% Completado</span>
              </div>
              <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#BFA181] transition-all duration-300"
                  style={{ width: `${(step / currentStepMax) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-normal text-white">
                1. ¿Cuál es el estado o color actual de tu cabello?
              </h3>
              <div className="space-y-2">
                {[
                  'Castaño Oscuro o Negro Natural',
                  'Castaño Claro / Rubio Natural',
                  'Cabello previamente teñido o con tinte acumulado',
                  'Con mechas/decoloración previa'
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect('currentColor', opt)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      answers.currentColor === opt
                        ? 'bg-[#BFA181] text-[#0F0F0F] font-bold border-[#BFA181]'
                        : 'bg-[#0F0F0F] text-stone-200 border-[#2A2A2A] hover:bg-stone-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-normal text-white">
                2. ¿Qué resultado te gustaría lograr?
              </h3>
              <div className="space-y-2">
                {[
                  'Balayage Rubio Miel / Manteca Luminoso',
                  'Morena Iluminada Caramelo / Miel (Efecto sutil)',
                  'Cobrizo Cálido o Cobre Dorado',
                  'Corregir manchas / Tonos anaranjados indeseados'
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect('desiredGoal', opt)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      answers.desiredGoal === opt
                        ? 'bg-[#BFA181] text-[#0F0F0F] font-bold border-[#BFA181]'
                        : 'bg-[#0F0F0F] text-stone-200 border-[#2A2A2A] hover:bg-stone-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-normal text-white">
                3. ¿Cuál es el largo aproximado de tu cabello?
              </h3>
              <div className="space-y-2">
                {[
                  'Corto / Estilo Bob (Por encima de los hombros)',
                  'Medio (A la altura del pecho)',
                  'Largo / Extra largo (Pasa la cintura)'
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect('hairLength', opt)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      answers.hairLength === opt
                        ? 'bg-[#BFA181] text-[#0F0F0F] font-bold border-[#BFA181]'
                        : 'bg-[#0F0F0F] text-stone-200 border-[#2A2A2A] hover:bg-stone-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RESULT */}
          {step === 4 && (
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 text-emerald-300 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/80 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>¡Diagnóstico completado con éxito!</span>
              </div>

              <div className="bg-[#0F0F0F] p-4 rounded-xl border border-[#2A2A2A] space-y-2 text-xs">
                <span className="text-[#BFA181] font-bold uppercase tracking-wider block text-[10px]">
                  Análisis Personalizado
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  {recommendation.title}
                </h4>
                <p className="text-stone-300 leading-relaxed">
                  {recommendation.description}
                </p>
                <div className="pt-2 text-stone-400 font-medium">
                  ⏱ Duración aproximada: <strong className="text-white">{recommendation.duration}</strong>
                </div>
              </div>

              <a
                href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${generateWhatsappMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#BFA181] text-[#0F0F0F] font-bold text-xs hover:bg-[#A88C6F] transition-all flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4 text-emerald-950 fill-emerald-950" />
                Enviar Diagnóstico por WhatsApp y Consultar Cita
              </a>
            </div>
          )}

          {/* Navigation Controls */}
          {step <= currentStepMax && (
            <div className="pt-4 flex items-center justify-between border-t border-[#2A2A2A]">
              {step > 1 ? (
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Anterior
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !answers.currentColor) ||
                  (step === 2 && !answers.desiredGoal) ||
                  (step === 3 && !answers.hairLength)
                }
                className="px-5 py-2.5 rounded-full bg-[#BFA181] text-[#0F0F0F] text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>{step === currentStepMax ? 'Ver Recomendación' : 'Siguiente'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
