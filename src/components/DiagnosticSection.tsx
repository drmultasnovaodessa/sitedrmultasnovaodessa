import React, { useState } from 'react';
import {
  FileText,
  User,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ClipboardList,
  AlertCircle,
  Paperclip,
  Edit3,
} from 'lucide-react';
import { DiagnosticFormData, ServiceId } from '../types';
import { BRAND, SERVICE_OPTIONS } from '../data/content';

interface DiagnosticSectionProps {
  formData: DiagnosticFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiagnosticFormData>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export function DiagnosticSection({
  formData,
  setFormData,
  currentStep,
  setCurrentStep,
}: DiagnosticSectionProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getServiceLabel = (serviceId: string) => {
    const found = SERVICE_OPTIONS.find((s) => s.id === serviceId);
    return found ? found.label : serviceId || 'Não especificado';
  };

  const validateStep = (step: number): boolean => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.nome.trim()) {
        setErrorMsg('Por favor, informe seu nome.');
        return false;
      }
    } else if (step === 2) {
      if (!formData.servico) {
        setErrorMsg('Por favor, selecione uma das opções de serviço.');
        return false;
      }
    } else if (step === 3) {
      if (!formData.descricao.trim()) {
        setErrorMsg('Por favor, descreva resumidamente sua situação.');
        return false;
      }
    }
    return true;
  };

  const handleNextFromStep1 = () => {
    if (!validateStep(1)) return;
    // If a service is already pre-selected, go directly to Step 3 (Describe situation)
    // If no service was pre-selected, proceed to Step 2 (Choose service)
    if (formData.servico) {
      setCurrentStep(3);
    } else {
      setCurrentStep(2);
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setErrorMsg('');
    if (currentStep === 3 && formData.servico) {
      // Allow user to go to step 2 to change service if they want, or step 1
      setCurrentStep(2);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      servico: '',
      descricao: '',
    });
    setErrorMsg('');
    setCurrentStep(1);
  };

  // Build the WhatsApp message
  const buildWhatsAppMessage = () => {
    const serviceLabel = getServiceLabel(formData.servico);

    return `NOVO DIAGNÓSTICO — DR MULTAS NOVA ODESSA

Nome:
${formData.nome.trim()}

Serviço:
${serviceLabel}

Descrição:
${formData.descricao.trim()}

📎 Documento: (caso tenha foto da multa, notificação ou documento, enviarei aqui na conversa)`;
  };

  const getWhatsAppUrl = () => {
    const message = buildWhatsAppMessage();
    return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(message)}`;
  };

  const stepLabels = [
    { num: '01', title: 'Seu nome' },
    { num: '02', title: 'Como ajudar' },
    { num: '03', title: 'Sua situação' },
  ];

  return (
    <section id="diagnostico" className="py-24 bg-zinc-950 relative border-t-2 border-yellow-500/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border-2 border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-wider mb-4 shadow-md">
            <ClipboardList className="w-4 h-4 text-yellow-400" />
            <span>Diagnóstico Rápido e Sem Cadastro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Análise Inicial do Seu Caso
          </h2>
          <p className="mt-4 text-base text-zinc-300 font-medium leading-relaxed">
            Responda 3 passos rápidos para organizar sua situação antes de falar diretamente com
            nossa equipe no WhatsApp.
          </p>
        </div>

        {/* Diagnostic Main Card */}
        <div className="rounded-3xl bg-zinc-900 border-2 border-yellow-400/70 p-6 sm:p-10 shadow-2xl shadow-black/80 relative overflow-hidden">
          {/* Top Yellow Road Striping Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500" />

          {/* Visual Step Indicator Bar (01 Seu nome | 02 Como ajudar | 03 Sua situação) */}
          {currentStep <= 3 && (
            <div className="mb-8">
              {/* Step Badges Row */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {stepLabels.map((s, idx) => {
                  const stepIndex = idx + 1;
                  const isActive = currentStep === stepIndex;
                  const isPassed = currentStep > stepIndex;

                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => {
                        // Allow clicking to previously completed steps or current step
                        if (stepIndex === 1 || (stepIndex === 2 && formData.nome.trim()) || (stepIndex === 3 && formData.nome.trim() && formData.servico)) {
                          setErrorMsg('');
                          setCurrentStep(stepIndex);
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isActive
                          ? 'bg-yellow-400 border-yellow-400 text-black shadow-md font-black'
                          : isPassed
                          ? 'bg-zinc-950 border-yellow-500/40 text-yellow-400 cursor-pointer hover:border-yellow-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                      }`}
                    >
                      <div className="text-[11px] font-mono font-black">{s.num}</div>
                      <div className="text-[10px] sm:text-xs font-bold tracking-tight uppercase truncate">
                        {s.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Road Progress Bar */}
              <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(250,204,21,0.5)]"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: NOME */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider">
                  <User className="w-4 h-4 text-yellow-400" />
                  <span>Passo 01 • Seu nome</span>
                </div>
                <h3 className="text-2xl font-black text-white">Qual é o seu nome?</h3>
                <p className="text-sm text-zinc-300">
                  Como gostaria de ser chamado no atendimento inicial.
                </p>
              </div>

              {/* Notice banner if a service was pre-selected from a service card */}
              {formData.servico && (
                <div className="p-3.5 rounded-xl bg-zinc-950 border-2 border-yellow-400/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-zinc-400 font-medium">Serviço pré-selecionado: </span>
                      <span className="text-xs font-black text-yellow-400 uppercase tracking-wide">
                        {getServiceLabel(formData.servico)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg('');
                      setCurrentStep(2);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-yellow-400 underline font-bold transition-colors flex-shrink-0"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Trocar serviço</span>
                  </button>
                </div>
              )}

              <div>
                <label htmlFor="input-nome" className="sr-only">
                  Qual é o seu nome?
                </label>
                <input
                  id="input-nome"
                  type="text"
                  placeholder="Digite seu nome completo ou primeiro nome"
                  value={formData.nome}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, nome: e.target.value }));
                    if (errorMsg) setErrorMsg('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNextFromStep1();
                    }
                  }}
                  autoFocus
                  className="w-full px-5 py-4 rounded-xl bg-zinc-950 border-2 border-zinc-700 text-white placeholder-zinc-500 text-base focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all font-medium"
                />
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  id="diagnostic-step1-next"
                  type="button"
                  onClick={handleNextFromStep1}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-500/20 transition-all active:scale-95 border-b-2 border-yellow-600"
                >
                  <span>Próximo passo</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SERVIÇO DESEJADO */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-yellow-400" />
                  <span>Passo 02 • Como podemos ajudar?</span>
                </div>
                <h3 className="text-2xl font-black text-white">Qual serviço você procura?</h3>
                <p className="text-sm text-zinc-300">
                  Selecione a opção que melhor descreve sua necessidade.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {SERVICE_OPTIONS.map((option) => {
                  const isSelected = formData.servico === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, servico: option.id as ServiceId }));
                        if (errorMsg) setErrorMsg('');
                      }}
                      className={`p-4 rounded-xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-yellow-400 border-yellow-400 text-black shadow-lg ring-2 ring-yellow-400/30'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-yellow-400/50 hover:bg-zinc-900'
                      }`}
                    >
                      <span className="leading-snug">{option.label}</span>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-black bg-black text-yellow-400'
                            : 'border-zinc-600 bg-transparent'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <button
                  id="diagnostic-step2-next"
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-500/20 transition-all active:scale-95 border-b-2 border-yellow-600"
                >
                  <span>Próximo passo</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DESCRIÇÃO */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4 text-yellow-400" />
                  <span>Passo 03 • Conte sua situação</span>
                </div>
                <h3 className="text-2xl font-black text-white">Conte brevemente o que aconteceu</h3>
                <p className="text-sm text-zinc-300">
                  Explique de forma resumida sua dúvida, autuação ou notificação recebida.
                </p>
              </div>

              {/* Service & Name Summary Pill with quick Edit button */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <span className="text-zinc-500">Nome: </span>
                    <span className="font-bold text-white">{formData.nome || 'Não informado'}</span>
                  </div>
                  <span className="text-zinc-700">|</span>
                  <div>
                    <span className="text-zinc-500">Serviço: </span>
                    <span className="font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2 py-0.5 rounded">
                      {getServiceLabel(formData.servico)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setCurrentStep(2);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 underline font-bold transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Trocar serviço</span>
                </button>
              </div>

              <div>
                <label htmlFor="input-descricao" className="sr-only">
                  Conte brevemente o que aconteceu
                </label>
                <textarea
                  id="input-descricao"
                  rows={4}
                  placeholder="Ex: Recebi uma notificação recente e gostaria de entender quais são as possibilidades de análise e os prazos aplicáveis ao meu caso..."
                  value={formData.descricao}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, descricao: e.target.value }));
                    if (errorMsg) setErrorMsg('');
                  }}
                  autoFocus
                  className="w-full px-5 py-4 rounded-xl bg-zinc-950 border-2 border-zinc-700 text-white placeholder-zinc-500 text-base focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none font-medium"
                />
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <button
                  id="diagnostic-step3-next"
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-500/20 transition-all active:scale-95 border-b-2 border-yellow-600"
                >
                  <span>Gerar Diagnóstico</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: TELA FINAL — DIAGNÓSTICO PRONTO / WHATSAPP */}
          {currentStep === 4 && (
            <div className="space-y-7 animate-in fade-in duration-300">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center mx-auto mb-2 shadow-xl border-2 border-yellow-300">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Diagnóstico Pronto
                </h3>
                <p className="text-base text-zinc-200 max-w-xl mx-auto font-medium leading-relaxed">
                  Suas informações foram organizadas. Clique no botão abaixo para abrir a conversa no
                  WhatsApp com a mensagem pronta.
                </p>
              </div>

              {/* Informative attachment prompt card */}
              <div className="p-4 rounded-2xl bg-yellow-500/10 border-2 border-yellow-400/50 text-left flex items-start gap-3">
                <Paperclip className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm text-yellow-300 font-bold">
                    Tem foto ou documento da multa?
                  </p>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    Você poderá anexar a foto ou PDF diretamente na conversa do WhatsApp logo após
                    enviar a mensagem.
                  </p>
                </div>
              </div>

              {/* Formatted Message Preview Box */}
              <div className="rounded-2xl bg-zinc-950 border-2 border-zinc-800 p-5 space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-yellow-400">
                    Mensagem que será enviada:
                  </span>
                  <span className="text-xs font-bold text-white bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-yellow-400" />
                    <span>WhatsApp Dr Multas (19 97168-5849)</span>
                  </span>
                </div>

                <div className="font-mono text-xs sm:text-sm text-zinc-200 space-y-3 whitespace-pre-line leading-relaxed bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 break-all">
                  {buildWhatsAppMessage()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                <a
                  id="btn-enviar-diagnostico-whatsapp"
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl text-base font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-xl shadow-yellow-500/25 transition-all transform active:scale-95 border-b-4 border-yellow-600 hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-5 h-5 text-black" />
                  <span>Continuar no WhatsApp</span>
                </a>

                <button
                  id="btn-fazer-outro-diagnostico"
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4.5 rounded-xl text-sm font-bold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Fazer outro diagnóstico</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
