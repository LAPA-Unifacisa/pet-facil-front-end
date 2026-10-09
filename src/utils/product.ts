export interface Product {
  id: string;
  nome: string;
  precoAtual: number;
  precoPromocional: number;
  tipo: string;
  descricao: string;
  dataValidade: string;
  maisVendido: boolean;
  estoque: number;
}

export const hasPromotion = (product: Product): boolean =>
  product.precoPromocional < product.precoAtual;

export const getEffectivePrice = (product: Product): number =>
  hasPromotion(product) ? product.precoPromocional : product.precoAtual;
