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
    legenda: 'Passeio de domingo no parque, Toby aprovou o sol!',
    categoria: 'passeio',
    foto: require('../../Fotos/1.jpg'),
  },
  {
    id: 'post-2',
    autor: 'Rafael Souza',
    petNome: 'Mel',
    legenda: 'Mel dormindo depois de um dia inteiro de brincadeira.',
    categoria: 'conquista',
    foto: require('../../Fotos/3.jpg'),
  },
  {
    id: 'post-3',
    autor: 'Camila Ferreira',
    petNome: 'Bento',
    legenda: 'Bento conheceu a bolinha nova e não largou mais.',
    categoria: 'brincadeira',
    foto: require('../../Fotos/6.jpg'),
  },
  {
    id: 'post-4',
    autor: 'Lucas Martins',
    petNome: 'Nina',
    legenda: 'Primeiro banho de tosa da Nina, ficou toda estilosa.',
    categoria: 'conquista',
    foto: require('../../Fotos/9.jpg'),
  },
  {
    id: 'post-5',
    autor: 'Beatriz Lima',
    petNome: 'Simba',
    legenda: 'Simba encontrou o cantinho perfeito de sol na sala.',
    categoria: 'passeio',
    foto: require('../../Fotos/11.jpg'),
  },
];
