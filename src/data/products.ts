export interface Product {
  id: string;
  nome: string;
  precoAtual: number;
  precoPromocional: number;
  tipo: string;
  descricao: string;
  dataValidade: string;
  maisVendido: boolean;
}

export const hasPromotion = (product: Product): boolean =>
  product.precoPromocional < product.precoAtual;

export const getEffectivePrice = (product: Product): number =>
  hasPromotion(product) ? product.precoPromocional : product.precoAtual;

export const products: Product[] = [
  {
    id: 'racao-premium-adultos',
    nome: 'Ração Premium Adultos 10kg',
    precoAtual: 189.9,
    precoPromocional: 159.9,
    tipo: 'racao',
    descricao: 'Nutrição completa para cães adultos de todos os portes.',
    dataValidade: '2027-03-15',
    maisVendido: true,
  },
  {
    id: 'racao-filhotes',
    nome: 'Ração Filhotes 3kg',
    precoAtual: 79.9,
    precoPromocional: 79.9,
    tipo: 'racao',
    descricao: 'Fórmula especial para o crescimento saudável de filhotes.',
    dataValidade: '2027-01-20',
    maisVendido: false,
  },
  {
    id: 'peticso-natural-frango',
    nome: 'Petisco Natural de Frango 200g',
    precoAtual: 24.9,
    precoPromocional: 19.9,
    tipo: 'petisco',
    descricao: 'Sem conservantes, ótimo para adestramento e recompensas.',
    dataValidade: '2026-12-10',
    maisVendido: true,
  },
  {
    id: 'bolinha-mordedora',
    nome: 'Bolinha Mordedora Resistente',
    precoAtual: 19.9,
    precoPromocional: 19.9,
    tipo: 'brinquedo',
    descricao: 'Borracha atóxica resistente a mordidas.',
    dataValidade: '2028-06-01',
    maisVendido: false,
  },
  {
    id: 'dispenser-interativo',
    nome: 'Brinquedo Interativo Dispenser',
    precoAtual: 59.9,
    precoPromocional: 49.9,
    tipo: 'brinquedo',
    descricao: 'Estimula o raciocínio enquanto libera petiscos aos poucos.',
    dataValidade: '2028-06-01',
    maisVendido: false,
  },
  {
    id: 'shampoo-neutro',
    nome: 'Shampoo Neutro Hipoalergênico 500ml',
    precoAtual: 34.9,
    precoPromocional: 34.9,
    tipo: 'higiene',
    descricao: 'Fórmula suave para todo tipo de pelagem, sem corantes.',
    dataValidade: '2027-05-30',
    maisVendido: false,
  },
  {
    id: 'escova-dupla-face',
    nome: 'Escova de Pelos Dupla Face',
    precoAtual: 29.9,
    precoPromocional: 24.9,
    tipo: 'higiene',
    descricao: 'Remove pelos soltos e desembaraça sem machucar a pele.',
    dataValidade: '2029-01-01',
    maisVendido: true,
  },
  {
    id: 'coleira-ajustavel',
    nome: 'Coleira Ajustável de Nylon',
    precoAtual: 39.9,
    precoPromocional: 39.9,
    tipo: 'acessorio',
    descricao: 'Resistente e confortável, com fivela de engate rápido.',
    dataValidade: '2029-01-01',
    maisVendido: false,
  },
  {
    id: 'guia-retratil',
    nome: 'Guia Retrátil 5 Metros',
    precoAtual: 59.9,
    precoPromocional: 49.9,
    tipo: 'acessorio',
    descricao: 'Trava de segurança e cabo reforçado para passeios tranquilos.',
    dataValidade: '2029-01-01',
    maisVendido: false,
  },
  {
    id: 'cama-redonda-m',
    nome: 'Cama Redonda Pet M',
    precoAtual: 129.9,
    precoPromocional: 129.9,
    tipo: 'acessorio',
    descricao: 'Cantinho macio e aconchegante para cães de porte médio.',
    dataValidade: '2029-01-01',
    maisVendido: false,
  },
  {
    id: 'antipulgas-carrapatos',
    nome: 'Antipulgas e Carrapatos',
    precoAtual: 44.9,
    precoPromocional: 44.9,
    tipo: 'medicamento',
    descricao: 'Comprimido de ação rápida contra pulgas e carrapatos.',
    dataValidade: '2026-11-05',
    maisVendido: true,
  },
  {
    id: 'vermifugo-oral',
    nome: 'Vermífugo Oral',
    precoAtual: 32.9,
    precoPromocional: 27.9,
    tipo: 'medicamento',
    descricao: 'Combate os principais parasitas intestinais em dose única.',
    dataValidade: '2026-10-18',
    maisVendido: false,
  },
];
