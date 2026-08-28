import { ServiceItem, PrincipleItem, StepItem, FaqItem } from '../types';

export const BRAND = {
  name: 'DR MULTAS NOVA ODESSA',
  shortName: 'DR Multas',
  city: 'Nova Odessa – SP',
  address: 'Av. Carlos Botelho, 1548 – Nova Odessa/SP',
  addressStreet: 'Av. Carlos Botelho, 1548',
  addressCityState: 'Nova Odessa – SP',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Carlos+Botelho%2C+1548%2C+Nova+Odessa+-+SP',
  instagramHandle: '@papodeguarda',
  instagramUrl: 'https://www.instagram.com/papodeguarda/',
  phoneRaw: '5519971685849',
  phoneFormatted: '(19) 97168-5849',
  generalWhatsAppUrl: 'https://wa.me/5519971685849?text=Ol%C3%A1!%20Conheci%20a%20DR%20Multas%20Nova%20Odessa%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20atendimento.',
  centralQuote: 'Não entregue seu direito de dirigir sem antes conhecer suas possibilidades de defesa.',
  pillars: ['Conhecimento', 'Ética', 'Rigor técnico', 'Estratégia'],
  disclaimer: 'Cada situação de trânsito possui características próprias e deve ser analisada individualmente. As informações apresentadas neste site possuem caráter informativo e não representam garantia de resultado.',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'recurso-multa',
    title: 'Recursos de Multas',
    shortDescription: 'Análise da situação e orientação sobre as possibilidades de recurso e defesa.',
    tag: 'Defesa e Recursos',
    iconName: 'FileCheck',
  },
  {
    id: 'analise-multa',
    title: 'Análise de Multa',
    shortDescription: 'Análise inicial da situação apresentada pelo condutor para identificar as informações relevantes do caso e orientar os próximos passos.',
    tag: 'Avaliação Inicial',
    iconName: 'SearchCheck',
  },
  {
    id: 'lei-seca',
    title: 'Lei Seca',
    shortDescription: 'Orientação e atuação em processos relacionados às infrações e procedimentos administrativos decorrentes da Lei Seca.',
    tag: 'Processos Administrativos',
    iconName: 'Wine',
  },
  {
    id: 'suspensao-cnh',
    title: 'Suspensão da CNH',
    shortDescription: 'Análise e orientação em processos administrativos relacionados à suspensão do direito de dirigir.',
    tag: 'Direito de Dirigir',
    iconName: 'AlertTriangle',
  },
  {
    id: 'cassacao-cnh',
    title: 'Cassação da CNH',
    shortDescription: 'Atuação e orientação em processos relacionados à cassação da habilitação.',
    tag: 'Defesa Especializada',
    iconName: 'ShieldAlert',
  },
  {
    id: 'veiculo-clonado',
    title: 'Veículo Clonado',
    shortDescription: 'Orientação para situações envolvendo suspeita ou identificação de veículo clonado.',
    tag: 'Orientação Especial',
    iconName: 'CarFront',
  },
  {
    id: 'curso-especializado',
    title: 'Cursos Especializados',
    shortDescription: 'Apresentação e orientação sobre os cursos especializados para condutores oferecidos pela empresa.',
    tag: 'Capacitação',
    iconName: 'GraduationCap',
  },
  {
    id: 'consultoria',
    title: 'Consultoria em Direito de Trânsito',
    shortDescription: 'Atendimento e orientação individual para situações relacionadas ao trânsito.',
    tag: 'Atendimento Individual',
    iconName: 'Scale',
  },
];

export const SERVICE_OPTIONS = [
  { id: 'recurso-multa', label: 'Recurso de multa' },
  { id: 'analise-multa', label: 'Análise de multa' },
  { id: 'lei-seca', label: 'Lei Seca' },
  { id: 'suspensao-cnh', label: 'Suspensão da CNH' },
  { id: 'cassacao-cnh', label: 'Cassação da CNH' },
  { id: 'veiculo-clonado', label: 'Veículo clonado' },
  { id: 'curso-especializado', label: 'Curso especializado' },
  { id: 'consultoria', label: 'Consultoria de trânsito' },
  { id: 'outro', label: 'Outro' },
] as const;

export const PRINCIPLES: PrincipleItem[] = [
  {
    title: 'Conhecimento',
    description: 'Experiência e conhecimento aplicado às situações de trânsito.',
    iconName: 'BookOpen',
  },
  {
    title: 'Ética',
    description: 'Atendimento responsável, transparente e profissional.',
    iconName: 'Scale',
  },
  {
    title: 'Rigor técnico',
    description: 'Cada situação deve ser analisada individualmente.',
    iconName: 'Cpu',
  },
  {
    title: 'Atendimento personalizado',
    description: 'O cliente não deve sentir que está recebendo uma solução genérica.',
    iconName: 'UserCheck',
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Você explica sua situação',
    description: 'O cliente responde algumas perguntas iniciais no diagnóstico rápido.',
  },
  {
    number: '02',
    title: 'Recebemos suas informações',
    description: 'As informações são organizadas para facilitar a análise inicial.',
  },
  {
    number: '03',
    title: 'Conversamos sobre o caso',
    description: 'A equipe entra em contato pelo WhatsApp para entender melhor a situação e solicitar os documentos necessários quando apropriado.',
  },
  {
    number: '04',
    title: 'Orientação',
    description: 'O caso é analisado e o cliente recebe orientação sobre os próximos passos.',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'Posso recorrer de uma multa?',
    answer: 'Sim. As possibilidades de recurso e defesa dependem da análise detalhada da situação fática, do auto de infração e dos documentos do caso, avaliando a conformidade legal do procedimento.',
  },
  {
    question: 'Vocês trabalham com Lei Seca?',
    answer: 'Sim. Atuamos com orientação e condução técnica em procedimentos e processos administrativos decorrentes de autuações da Lei Seca.',
  },
  {
    question: 'Minha CNH pode ser suspensa?',
    answer: 'A suspensão do direito de dirigir depende do acúmulo de pontuação, da natureza da infração cometida (infracional específica) e do andamento do processo administrativo, sendo necessária uma análise individual.',
  },
  {
    question: 'Vocês trabalham com cassação da CNH?',
    answer: 'Sim. Oferecemos suporte e orientação técnica para processos administrativos de cassação da CNH, examinando todas as fases e requisitos processuais.',
  },
  {
    question: 'Preciso enviar meus documentos pelo site?',
    answer: 'Não. O diagnóstico inicial não exige envio obrigatório de documentos. Você pode anexar uma foto ou notificação opcionalmente no formulário (o arquivo fica apenas temporariamente no seu navegador) ou enviá-la diretamente na conversa do WhatsApp.',
  },
];
