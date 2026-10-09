import { Product, hasPromotion } from '@/src/utils/product';

import Badge from '../ui/Badge';

interface PromoBadgeProps {
  product: Product;
}

export default function PromoBadge({ product }: PromoBadgeProps) {
  if (!hasPromotion(product)) {
    return null;
  }

  const percentOff = Math.round((1 - product.precoPromocional / product.precoAtual) * 100);

  return <Badge label={`-${percentOff}%`} tone="promo" />;
}
