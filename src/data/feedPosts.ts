import { ImageSourcePropType } from 'react-native';

export interface FeedPost {
  id: string;
  autor: string;
  petNome: string;
  legenda: string;
  categoria: string;
  foto: ImageSourcePropType;
}

export const feedPosts: FeedPost[] = [
  {
    id: 'post-1',
    autor: 'Marina Alves',
    petNome: 'Toby',
    legenda: 'Toby explorando a casa toda, esse filhote não para quieto!',
    categoria: 'brincadeira',
    foto: require('../../Fotos/6.jpg'),
  },
  {
    id: 'post-2',
    autor: 'Rafael Souza',
    petNome: 'Mel',
    legenda: 'Mel aproveitando a manta nova pra tirar uma soneca.',
    categoria: 'conquista',
    foto: require('../../Fotos/4.jpg'),
  },
  {
    id: 'post-4',
    autor: 'Lucas Martins',
    petNome: 'Bento',
    legenda: 'Bento posando igual modelo depois do banho de hoje.',
    categoria: 'conquista',
    foto: require('../../Fotos/11.jpg'),
  },
  {
    id: 'post-5',
    autor: 'Beatriz Lima',
    petNome: 'Nina',
    legenda: 'Nina flagrada fazendo careta depois do lanche da tarde.',
    categoria: 'brincadeira',
    foto: require('../../Fotos/12.jpg'),
  },
  {
    id: 'post-6',
    autor: 'Diego Ramos',
    petNome: 'Rex e Mimi',
    legenda: 'Rex e Mimi virando melhores amigos de casa essa semana.',
    categoria: 'conquista',
    foto: require('../../Fotos/10.jpg'),
  },
];
