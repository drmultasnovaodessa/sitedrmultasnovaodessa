export type ServiceId =
  | 'recurso-multa'
  | 'analise-multa'
  | 'lei-seca'
  | 'suspensao-cnh'
  | 'cassacao-cnh'
  | 'veiculo-clonado'
  | 'curso-especializado'
  | 'consultoria'
  | 'outro';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  shortDescription: string;
  tag: string;
  iconName: 'FileCheck' | 'SearchCheck' | 'Wine' | 'AlertTriangle' | 'ShieldAlert' | 'CarFront' | 'GraduationCap' | 'Scale';
}

export interface PrincipleItem {
  title: string;
  description: string;
  iconName: 'BookOpen' | 'Scale' | 'Cpu' | 'UserCheck';
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DiagnosticFormData {
  nome: string;
  servico: ServiceId | '';
  descricao: string;
}
