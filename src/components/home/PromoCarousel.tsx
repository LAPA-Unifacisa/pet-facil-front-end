import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Product, getEffectivePrice } from '@/src/data/products';
import { borderRadius, colors, spacing, typography } from '@/src/theme';
import { formatCurrency } from '@/src/utils/currency';

const CARD_WIDTH = 240;
const CARD_GAP = spacing.sm;
const AUTO_PLAY_INTERVAL = 4000;

const promoPhotos = [
  require('../../../Fotos/1.jpg'),
  require('../../../Fotos/2.jpg'),
  require('../../../Fotos/3.jpg'),
  require('../../../Fotos/7.jpg'),
  require('../../../Fotos/8.jpg'),
  require('../../../Fotos/9.jpg'),
];

interface PromoCarouselProps {
  products: Product[];
  onPressProduct: (product: Product) => void;
}

export default function PromoCarousel({ products, onPressProduct }: PromoCarouselProps) {
  const listRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (products.length < 2) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % products.length;
        listRef.current?.scrollToOffset({
          offset: next * (CARD_WIDTH + CARD_GAP),
          animated: true,
        });
        return next;
      });
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) {
    return null;
  }

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(Math.max(0, Math.min(index, products.length - 1)));
  };

  return (
    <View>
      <FlatList
        ref={listRef}
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        snapToInterval={CARD_WIDTH + CARD_GAP}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => onPressProduct(item)}>
            <ImageBackground
              source={promoPhotos[index % promoPhotos.length]}
              style={styles.card}
              imageStyle={styles.cardImage}
            >
              <View style={styles.overlay} />
              <Text style={styles.tag}>Promoção</Text>
              <Text style={styles.name} numberOfLines={2}>
                {item.nome}
              </Text>
              <Text style={styles.price}>{formatCurrency(getEffectivePrice(item))}</Text>
            </ImageBackground>
          </Pressable>
        )}
      />

      {products.length > 1 && (
        <View style={styles.dots}>
          {products.map((product, index) => (
            <View
              key={product.id}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: CARD_GAP,
    paddingRight: spacing.lg,
  },
  card: {
    width: CARD_WIDTH,
    minHeight: 140,
    justifyContent: 'flex-end',
    padding: spacing.md,
    overflow: 'hidden',
  },
  cardImage: {
    borderRadius: borderRadius.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  tag: {
    ...typography.small,
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    color: colors.textPrimary,
    fontWeight: '700',
    borderRadius: borderRadius.full,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.heading3,
    color: colors.surface,
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.bodyBold,
    color: colors.surface,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.primary,
  },
});
