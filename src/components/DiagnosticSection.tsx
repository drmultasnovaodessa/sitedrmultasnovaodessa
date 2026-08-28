import React, { useState } from 'react';
import {
  FileText,
  User,
  Phone,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ClipboardList,
} from 'lucide-react';
import { DiagnosticFormData, ServiceId } from '../types';
import { BRAND, SERVICE_OPTIONS } from '../data/content';

interface DiagnosticSectionProps {
  formData: DiagnosticFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiagnosticFormData>>;
}

export function DiagnosticSection({ formData, setFormData }: DiagnosticSectionProps) {
  // Step state: 1 (Nome), 2 (WhatsApp), 3 (Serviço), 4 (Descrição), 5 (Diagnóstico Preparado)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
    if (errorMsg) setErrorMsg('');
  };

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
      const numbers = formData.whatsapp.replace(/\D/g, '');
      if (numbers.length < 10) {
        setErrorMsg('Por favor, digite um número de WhatsApp válido com DDD.');
        return false;
      }
    } else if (step === 3) {
      if (!formData.servico) {
        setErrorMsg('Por favor, selecione uma das opções de serviço.');
        return false;
      }
    } else if (step === 4) {
      if (!formData.descricao.trim()) {
        setErrorMsg('Por favor, descreva resumidamente o que aconteceu.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      whatsapp: '',
      servico: '',
      descricao: '',
    });
    setErrorMsg('');
    setCurrentStep(1);
  };

  // Build the exact WhatsApp message formatted as requested
  const buildWhatsAppMessage = () => {
    const serviceLabel = getServiceLabel(formData.servico);
    return `NOVO DIAGNÓSTICO — DR MULTAS NOVA ODESSA

Nome:
${formData.nome.trim()}

WhatsApp:
${formData.whatsapp.trim()}

Serviço:
${serviceLabel}

Descrição da situação:
${formData.descricao.trim()}`;
  };

  const getWhatsAppUrl = () => {
    const message = buildWhatsAppMessage();
    return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(message)}`;
  };

  const stepLabels = [
    { num: '01', title: 'SUA SITUAÇÃO' },
    { num: '02', title: 'CONTATO' },
    { num: '03', title: 'TIPO DE PROCESSO' },
    { num: '04', title: 'O QUE ACONTECEU' },
  ];

  return (
    <section id="diagnostico" className="py-24 bg-zinc-950 relative border-t-2 border-yellow-500/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border-2 border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-wider mb-4 shadow-md">
            <ClipboardList className="w-4 h-4 text-yellow-400" />
            <span>Diagnóstico Inicial Simples</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Análise Inicial do Seu Caso
          </h2>
          <p className="mt-4 text-base text-zinc-300 font-medium leading-relaxed">
            Responda 4 perguntas rápidas para organizar sua situação antes de falar diretamente com
            nossa equipe pelo WhatsApp.
          </p>
        </div>

        {/* Diagnostic Main Card */}
        <div className="rounded-3xl bg-zinc-900 border-2 border-yellow-400/70 p-6 sm:p-10 shadow-2xl shadow-black/80 relative overflow-hidden">
          {/* Top Yellow Road Striping Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500" />

          {/* Visual Step Indicator Bar (01 SUA SITUAÇÃO | 02 CONTATO | 03 PROCESSO | 04 O QUE ACONTECEU) */}
          {currentStep <= 4 && (
            <div className="mb-8">
              {/* Step Badges Row */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {stepLabels.map((s, idx) => {
                  const stepIndex = idx + 1;
                  const isActive = currentStep === stepIndex;
                  const isPassed = currentStep > stepIndex;

                  return (
                    <div
                      key={s.num}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isActive
                          ? 'bg-yellow-400 border-yellow-400 text-black shadow-md'
                          : isPassed
                          ? 'bg-zinc-950 border-yellow-500/40 text-yellow-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                      }`}
                    >
                      <div className="text-[11px] font-mono font-black">{s.num}</div>
                      <div className="text-[9px] sm:text-[10px] font-bold tracking-tight uppercase truncate">
                        {s.title}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Road Progress Bar */}
              <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(250,204,21,0.5)]"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
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
                  <span>Passo 01 • Sua Identificação</span>
                </div>
                <h3 className="text-2xl font-black text-white">Qual é o seu nome?</h3>
                <p className="text-sm text-zinc-300">
                  Como gostaria de ser chamado no atendimento inicial.
                </p>
              </div>

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
                      nextStep();
                    }
                  }}
                  autoFocus
                  className="w-full px-5 py-4 rounded-xl bg-zinc-950 border-2 border-zinc-700 text-white placeholder-zinc-500 text-base focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all font-medium"
                />
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  id="diagnostic-step1-next"
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

          {/* STEP 2: WHATSAPP */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider">
                  <Phone className="w-4 h-4 text-yellow-400" />
                  <span>Passo 02 • Contato Direto</span>
                </div>
                <h3 className="text-2xl font-black text-white">Qual é o seu WhatsApp?</h3>
                <p className="text-sm text-zinc-300">
                  Número de contato com DDD para continuarmos o atendimento.
                </p>
              </div>

              <div>
                <label htmlFor="input-whatsapp" className="sr-only">
                  Qual é o seu WhatsApp?
                </label>
                <input
                  id="input-whatsapp"
                  type="tel"
                  placeholder="(19) 99999-9999"
                  value={formData.whatsapp}
                  onChange={handlePhoneChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      nextStep();
                    }
                  }}
                  autoFocus
                  className="w-full px-5 py-4 rounded-xl bg-zinc-950 border-2 border-zinc-700 text-white placeholder-zinc-500 text-base focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all font-mono font-bold"
                />
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold">
                  {errorMsg}
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

          {/* STEP 3: SERVIÇO */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-yellow-400" />
                  <span>Passo 03 • Assunto do Processo</span>
                </div>
                <h3 className="text-2xl font-black text-white">O que você precisa resolver?</h3>
                <p className="text-sm text-zinc-300">
                  Selecione o assunto principal do seu atendimento.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
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
                      className={`p-4 rounded-xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-yellow-400 border-yellow-400 text-black shadow-lg'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-yellow-400/50 hover:bg-zinc-900'
                      }`}
                    >
                      <span>{option.label}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-black bg-black text-yellow-400'
                            : 'border-zinc-600 bg-transparent'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-yellow-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold">
                  {errorMsg}
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
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-500/20 transition-all active:scale-95 border-b-2 border-yellow-600"
                >
                  <span>Próximo passo</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: DESCRIÇÃO */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4 text-yellow-400" />
                  <span>Passo 04 • Resumo dos Fatos</span>
                </div>
                <h3 className="text-2xl font-black text-white">Conte brevemente o que aconteceu</h3>
                <p className="text-sm text-zinc-300">
                  Explique de forma resumida sua dúvida ou a notificação recebida. Não é necessário
                  informar CPF, CNH ou fotos de documentos neste momento.
                </p>
              </div>

              <div>
                <label htmlFor="input-descricao" className="sr-only">
                  Conte brevemente o que aconteceu
                </label>
                <textarea
                  id="input-descricao"
                  rows={4}
                  placeholder="Ex: Recebi uma notificação de autuação e gostaria de entender quais são as possibilidades de recurso e os prazos aplicáveis..."
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
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold">
                  {errorMsg}
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
                  id="diagnostic-step4-finish"
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-xl shadow-yellow-500/25 transition-all active:scale-95 border-b-2 border-yellow-600"
                >
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Preparar Diagnóstico</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: TELA APÓS O ENVIO / DIAGNÓSTICO PREPARADO */}
          {currentStep === 5 && (
            <div className="space-y-7 animate-in fade-in duration-300">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center mx-auto mb-2 shadow-xl border-2 border-yellow-300">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Diagnóstico preparado.
                </h3>
                <p className="text-base text-zinc-200 max-w-lg mx-auto font-medium">
                  Suas informações foram organizadas e estão prontas para serem enviadas diretamente
                  pelo WhatsApp.
                </p>
              </div>

              {/* Formatted Message Preview Box */}
              <div className="rounded-2xl bg-zinc-950 border-2 border-zinc-800 p-5 space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-yellow-400">
                    Mensagem que será enviada:
                  </span>
                  <span className="text-xs font-bold text-white bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-yellow-400" />
                    <span>WhatsApp DR Multas</span>
                  </span>
                </div>

                <div className="font-mono text-xs sm:text-sm text-zinc-200 space-y-3 whitespace-pre-line leading-relaxed bg-zinc-900/90 p-4 rounded-xl border border-zinc-800">
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
                  <span>Enviar diagnóstico pelo WhatsApp</span>
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

              <p className="text-xs text-zinc-400 text-center pt-2 font-medium">
                Ao clicar em "Enviar diagnóstico", seu aplicativo de WhatsApp será aberto com a
                mensagem pronta para envio.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
