export interface FeedPost {
  id: string;
  autor: string;
  petNome: string;
  legenda: string;
  categoria: string;
}

export const feedPosts: FeedPost[] = [
  {
    id: 'post-1',
    autor: 'Marina Alves',
    petNome: 'Toby',
    legenda: 'Passeio de domingo no parque, Toby aprovou o sol!',
    categoria: 'passeio',
  },
  {
    id: 'post-2',
    autor: 'Rafael Souza',
    petNome: 'Mel',
    legenda: 'Mel dormindo depois de um dia inteiro de brincadeira.',
    categoria: 'conquista',
  },
  {
    id: 'post-3',
    autor: 'Camila Ferreira',
    petNome: 'Bento',
    legenda: 'Bento conheceu a bolinha nova e não largou mais.',
    categoria: 'brincadeira',
  },
  {
    id: 'post-4',
    autor: 'Lucas Martins',
    petNome: 'Nina',
    legenda: 'Primeiro banho de tosa da Nina, ficou toda estilosa.',
    categoria: 'conquista',
  },
  {
    id: 'post-5',
    autor: 'Beatriz Lima',
    petNome: 'Simba',
    legenda: 'Simba encontrou o cantinho perfeito de sol na sala.',
    categoria: 'passeio',
  },
];
