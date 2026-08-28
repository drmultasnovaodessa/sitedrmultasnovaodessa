import React, { useState, useRef } from 'react';
import {
  FileText,
  User,
  HelpCircle,
  MessageSquare,
  Paperclip,
  Upload,
  X,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ClipboardList,
  AlertCircle,
  Loader2,
  Clock,
  Link as LinkIcon,
} from 'lucide-react';
import { DiagnosticFormData, ServiceId } from '../types';
import { BRAND, SERVICE_OPTIONS } from '../data/content';

interface DiagnosticSectionProps {
  formData: DiagnosticFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiagnosticFormData>>;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function DiagnosticSection({ formData, setFormData }: DiagnosticSectionProps) {
  // Step state: 1 (Seu nome), 2 (Como podemos ajudar?), 3 (Conte sua situação), 4 (Anexo opcional), 5 (Diagnóstico pronto / WhatsApp)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [uploadWarning, setUploadWarning] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getServiceLabel = (serviceId: string) => {
    const found = SERVICE_OPTIONS.find((s) => s.id === serviceId);
    return found ? found.label : serviceId || 'Não especificado';
  };

  const handleFileSelection = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setFormData((prev) => ({ ...prev, arquivoNome: '', tempFileUrl: '' }));
      setErrorMsg('');
      return;
    }

    // Check allowed extensions
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
    const fileNameLower = file.name.toLowerCase();
    const isValidExtension = validExtensions.some((ext) => fileNameLower.endsWith(ext));

    if (!isValidExtension) {
      setErrorMsg('Formato não suportado. Por favor, envie JPG, JPEG, PNG, WEBP ou PDF.');
      return;
    }

    // Check size limit (10MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMsg(
        'O arquivo selecionado excede o limite máximo permitido de 10 MB. Por favor, escolha um arquivo menor.'
      );
      return;
    }

    setErrorMsg('');
    setUploadWarning('');
    setSelectedFile(file);
    setFormData((prev) => ({ ...prev, arquivoNome: file.name, tempFileUrl: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelection(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFileSelection(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFormData((prev) => ({ ...prev, arquivoNome: '', tempFileUrl: '' }));
    setErrorMsg('');
    setUploadWarning('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const uploadFileTemporarily = async (file: File): Promise<string | null> => {
    try {
      const base64Data = await fileToBase64(file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          mimeType: file.type || 'application/octet-stream',
          base64: base64Data,
        }),
      });

      if (!res.ok) {
        throw new Error(`Upload retornou status ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.url) {
        return data.url;
      }
      return null;
    } catch (err) {
      console.error('Erro ao realizar upload temporário:', err);
      return null;
    }
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

  const nextStep = async () => {
    if (!validateStep(currentStep)) return;

    // Transitioning from Step 4 (Attachment) to Step 5 (Final / WhatsApp)
    if (currentStep === 4) {
      if (selectedFile) {
        setIsUploading(true);
        setErrorMsg('');
        setUploadWarning('');

        const uploadedUrl = await uploadFileTemporarily(selectedFile);
        setIsUploading(false);

        if (uploadedUrl) {
          setFormData((prev) => ({
            ...prev,
            tempFileUrl: uploadedUrl,
          }));
        } else {
          setUploadWarning(
            'Não foi possível anexar o arquivo. Você pode continuar pelo WhatsApp e enviar o documento diretamente na conversa.'
          );
          setFormData((prev) => ({
            ...prev,
            tempFileUrl: '',
          }));
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          tempFileUrl: '',
          arquivoNome: '',
        }));
      }
      setCurrentStep(5);
    } else {
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
      servico: '',
      descricao: '',
      arquivoNome: '',
      tempFileUrl: '',
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrorMsg('');
    setUploadWarning('');
    setIsUploading(false);
    setCurrentStep(1);
  };

  // Build the exact WhatsApp message formatted as requested
  const buildWhatsAppMessage = () => {
    const serviceLabel = getServiceLabel(formData.servico);
    const hasDocLink = Boolean(formData.tempFileUrl && formData.tempFileUrl.trim() !== '');

    let msg = `NOVO DIAGNÓSTICO — DR MULTAS NOVA ODESSA

Nome:
${formData.nome.trim()}

Serviço:
${serviceLabel}

Descrição:
${formData.descricao.trim()}`;

    if (hasDocLink) {
      msg += `

📎 DOCUMENTO:
${formData.tempFileUrl?.trim()}`;
    }

    return msg;
  };

  const getWhatsAppUrl = () => {
    const message = buildWhatsAppMessage();
    return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(message)}`;
  };

  const stepLabels = [
    { num: '01', title: 'Seu nome' },
    { num: '02', title: 'Como ajudar' },
    { num: '03', title: 'Sua situação' },
    { num: '04', title: 'Anexo opcional' },
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
            Responda as etapas interativas para organizar sua situação antes de falar diretamente com
            nossa equipe no WhatsApp.
          </p>
        </div>

        {/* Diagnostic Main Card */}
        <div className="rounded-3xl bg-zinc-900 border-2 border-yellow-400/70 p-6 sm:p-10 shadow-2xl shadow-black/80 relative overflow-hidden">
          {/* Top Yellow Road Striping Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500" />

          {/* Visual Step Indicator Bar (01 Seu nome | 02 Como ajudar | 03 Sua situação | 04 Anexo opcional) */}
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
                  <span>Passo 01 • Seu nome</span>
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
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
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
                      className={`p-4 rounded-xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-yellow-400 border-yellow-400 text-black shadow-lg'
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
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-500/20 transition-all active:scale-95 border-b-2 border-yellow-600"
                >
                  <span>Próximo passo</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ANEXO OPCIONAL */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider">
                  <Paperclip className="w-4 h-4 text-yellow-400" />
                  <span>Passo 04 • Anexo opcional</span>
                </div>
                <h3 className="text-2xl font-black text-white">Deseja anexar algum arquivo?</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Você pode anexar uma foto ou documento relacionado à sua situação, como uma multa,
                  notificação ou outro documento que queira apresentar à nossa equipe.
                </p>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                id="file-upload-input"
                accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Drag and drop upload zone */}
              {!selectedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-zinc-700 bg-zinc-950/70 hover:border-yellow-400/70 hover:bg-zinc-950'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 text-yellow-400 flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Upload className="w-7 h-7" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase tracking-wider transition-all shadow-md mb-2"
                  >
                    <Paperclip className="w-4 h-4 text-black" />
                    <span>Anexar multa ou documento</span>
                  </button>
                  <p className="text-xs text-zinc-400 font-medium">
                    Ou arraste e solte o arquivo aqui (JPG, JPEG, PNG, WEBP ou PDF — máx. 10 MB)
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-zinc-400 bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-800">
                    <Clock className="w-3 h-3 text-yellow-400" />
                    <span>O link do documento é temporário e expira em 48h.</span>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-zinc-950 border-2 border-yellow-400/60 flex items-center justify-between gap-4 shadow-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-yellow-400 text-black flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-yellow-400">Documento selecionado:</div>
                      <p className="text-sm font-bold text-white truncate">{selectedFile.name}</p>
                      <p className="text-xs text-zinc-400 font-mono">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold transition-all"
                    >
                      Trocar
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-2 rounded-lg bg-zinc-900 hover:bg-red-950/60 border border-zinc-700 hover:border-red-500 text-zinc-400 hover:text-red-300 transition-all"
                      title="Remover arquivo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-all disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <button
                  id="diagnostic-step4-finish"
                  type="button"
                  disabled={isUploading}
                  onClick={nextStep}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-xl shadow-yellow-500/25 transition-all active:scale-95 border-b-2 border-yellow-600 disabled:opacity-75"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Gerando link temporário...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-black" />
                      <span>{selectedFile ? 'Continuar com anexo' : 'Continuar sem anexo'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: TELA FINAL — DIAGNÓSTICO PRONTO / WHATSAPP */}
          {currentStep === 5 && (
            <div className="space-y-7 animate-in fade-in duration-300">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center mx-auto mb-2 shadow-xl border-2 border-yellow-300">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Diagnóstico pronto
                </h3>
                <p className="text-base text-zinc-200 max-w-xl mx-auto font-medium leading-relaxed">
                  Suas informações foram organizadas para facilitar o atendimento. Ao abrir o
                  WhatsApp, envie a mensagem e, caso tenha selecionado um arquivo, anexe-o na
                  conversa.
                </p>
              </div>

              {/* Upload Failure Warning Notice if upload failed */}
              {uploadWarning && (
                <div className="p-4 rounded-2xl bg-amber-950/60 border-2 border-amber-500/80 text-left flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-amber-200 leading-relaxed font-medium">
                    {uploadWarning}
                  </p>
                </div>
              )}

              {/* Document Link Success Notice */}
              {formData.tempFileUrl && (
                <div className="p-4 rounded-2xl bg-emerald-950/50 border-2 border-emerald-500/60 text-left flex items-start gap-3">
                  <LinkIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm text-emerald-200 font-bold">
                      Link temporário do documento gerado com sucesso!
                    </p>
                    <p className="text-xs text-emerald-300/80 mt-0.5">
                      O arquivo expira automaticamente em 48 horas e o link já foi incluído na mensagem do WhatsApp.
                    </p>
                  </div>
                </div>
              )}

              {/* Formatted Message Preview Box */}
              <div className="rounded-2xl bg-zinc-950 border-2 border-zinc-800 p-5 space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-yellow-400">
                    Mensagem que será enviada:
                  </span>
                  <span className="text-xs font-bold text-white bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-yellow-400" />
                    <span>WhatsApp DR Multas (19 97168-5849)</span>
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
