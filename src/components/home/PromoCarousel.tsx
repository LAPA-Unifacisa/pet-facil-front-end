import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { borderRadius, colors, spacing, typography } from '@/src/theme';

const CARD_WIDTH = 350;
const CARD_GAP = spacing.sm;
const AUTO_PLAY_INTERVAL = 4000;
const OVERLAY_RGB = '43, 33, 26';

interface PromoBanner {
  id: string;
  tag: string;
  title: string;
  cta: string;
  photo: ImageSourcePropType;
  route: '/agenda' | '/produtos' | '/aumigos';
}

const banners: PromoBanner[] = [
  {
    id: 'primeira-visita',
    tag: 'Primeira visita',
    title: '20% off no primeiro banho & tosa',
    cta: 'Agendar agora',
    photo: require('../../../Fotos/10.jpg'),
    route: '/agenda',
  },
  {
    id: 'combo-semana',
    tag: 'Combo da semana',
    title: 'Banho + tosa com 15% off',
    cta: 'Agendar agora',
    photo: require('../../../Fotos/7.jpg'),
    route: '/agenda',
  },
  {
    id: 'novidade',
    tag: 'Novidade',
    title: 'Chegou a nova linha de brinquedos',
    cta: 'Ver na loja',
    photo: require('../../../Fotos/3.jpg'),
    route: '/produtos',
  },
  {
    id: 'indique-amigo',
    tag: 'Indique um amigo',
    title: 'Convide outros tutores pra rede AUmigos',
    cta: 'Ver AUmigos',
    photo: require('../../../Fotos/9.jpg'),
    route: '/aumigos',
  },
];

export default function PromoCarousel() {
  const listRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % banners.length;
        listRef.current?.scrollToOffset({
          offset: next * (CARD_WIDTH + CARD_GAP),
          animated: true,
        });
        return next;
      });
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(Math.max(0, Math.min(index, banners.length - 1)));
  };

  return (
    <View>
      <FlatList
        ref={listRef}
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        snapToInterval={CARD_WIDTH + CARD_GAP}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(item.route)} style={styles.cardWrapper}>
            <ImageBackground source={item.photo} style={styles.card} imageStyle={styles.cardImage}>
              <LinearGradient
                colors={[
                  `rgba(${OVERLAY_RGB}, 0.85)`,
                  `rgba(${OVERLAY_RGB}, 0.05)`,
                  `rgba(${OVERLAY_RGB}, 0)`,
                ]}
                locations={[0, 0.6, 1]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={styles.gradient}
              />
              <Text style={styles.tag}>{item.tag}</Text>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.ctaButton}>
                <Text style={styles.ctaLabel}>{item.cta}</Text>
              </View>
            </ImageBackground>
          </Pressable>
        )}
      />

      <View style={styles.dots}>
        {banners.map((banner, index) => (
          <View key={banner.id} style={[styles.dot, index === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: CARD_GAP,
    paddingRight: spacing.lg,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    aspectRatio: 16 / 10,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  cardImage: {
    borderRadius: borderRadius.lg,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
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
  title: {
    ...typography.heading3,
    color: colors.surface,
    marginBottom: spacing.sm,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
  ctaLabel: {
    ...typography.small,
    fontWeight: '700',
    color: colors.textPrimary,
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
